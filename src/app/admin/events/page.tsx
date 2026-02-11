"use client";

import { useState, useEffect } from "react";
import { Event } from "@/types/event";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { createEvent, updateEvent, deleteEvent, fetchAllEvents } from "@/lib/admin-functions";
import { generateSlug } from "@/lib/blog-utils";
import { Plus, Edit, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/ImageUpload";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { formatEventDate, formatTime, getEventStatus, getValidEventImageUrl } from "@/lib/event-utils";
import { format } from "date-fns";

// Admin Event Card Component
function AdminEventCard({ 
  event, 
  onEdit, 
  onDelete, 
  getValidImageUrl 
}: { 
  event: Event; 
  onEdit: () => void; 
  onDelete: () => void;
  getValidImageUrl: (url: string) => string;
}) {
  const [imageLoading, setImageLoading] = useState(true);
  const formattedDate = formatEventDate(event);
  const formattedTime = formatTime(event);
  const status = getEventStatus(event);
  
  return (
    <div className="bg-card rounded-2xl overflow-hidden flex flex-col relative group">
      {/* Image */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
        {imageLoading && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
        )}
        <Image
          src={getValidImageUrl(event.imageURL)}
          alt={event.title}
          fill
          className="object-cover rounded-2xl"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
        {/* Action buttons overlay */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            variant="secondary"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8 bg-white/90 hover:bg-white"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 bg-white/90 hover:bg-white"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
        <div className="absolute top-2 left-2">
          <Badge className={`${status.color} text-white`}>
            {status.label}
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="pt-6 pr-6 pb-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 flex-wrap">
          <span className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            {formattedDate}
          </span>
          {formattedTime && (
            <>
              <span>•</span>
              <span>{formattedTime}</span>
            </>
          )}
        </div>
        <h3 className="text-xl font-display font-bold text-foreground mb-3 line-clamp-2 leading-tight">
          {event.title}
        </h3>
        <p className="text-base text-muted-foreground mb-3 line-clamp-1">
          {event.location}
        </p>
        <p className="text-base text-muted-foreground mb-4 flex-grow line-clamp-3 leading-relaxed">
          {event.description}
        </p>
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-md bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="text-xs text-muted-foreground mt-auto">
          <p>Slug: {event.slug}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    imageURL: "",
    location: "",
    eventDate: undefined as Date | undefined,
    startTime: "",
    endTime: "",
    tags: [] as string[],
    isFeatured: false,
    slug: "",
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsData = await fetchAllEvents();
      // Sort by event date (upcoming first)
      eventsData.sort((a, b) => {
        const getDate = (event: Event): number => {
          const dateValue = event.eventDate;
          if (!dateValue) return 0;
          try {
            if (typeof (dateValue as any).toDate === 'function') {
              return (dateValue as any).toDate().getTime();
            }
            if (typeof dateValue === 'string') {
              return new Date(dateValue).getTime();
            }
            return 0;
          } catch {
            return 0;
          }
        };
        return getDate(a) - getDate(b);
      });
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.location || !formData.eventDate) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, formData);
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
      } else {
        await createEvent(formData);
        toast({
          title: "Success",
          description: "Event created successfully",
        });
      }
      setDialogOpen(false);
      resetForm();
      fetchEvents();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save event",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    
    // Convert event date to Date object
    let eventDate: Date | undefined = undefined;
    const dateValue = event.eventDate;
    if (dateValue) {
      if (typeof (dateValue as any).toDate === 'function') {
        eventDate = (dateValue as any).toDate();
      } else if (typeof dateValue === 'string') {
        eventDate = new Date(dateValue);
      }
    }
    
    setFormData({
      title: event.title,
      description: event.description,
      content: event.content || "",
      imageURL: event.imageURL,
      location: event.location,
      eventDate: eventDate,
      startTime: event.startTime || "",
      endTime: event.endTime || "",
      tags: event.tags || [],
      isFeatured: event.isFeatured || false,
      slug: event.slug,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(eventId);
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      fetchEvents();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      imageURL: "",
      location: "",
      eventDate: undefined,
      startTime: "",
      endTime: "",
      tags: [],
      isFeatured: false,
      slug: "",
    });
    setEditingEvent(null);
    setTagInput("");
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const getValidImageUrl = (imageURL: string): string => {
    return getValidEventImageUrl(imageURL);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Event Management</h1>
            <p className="text-muted-foreground">Create and manage events</p>
          </div>
          <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>

        {/* Create/Edit Event Form Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
              <DialogDescription>
                {editingEvent ? "Update event information" : "Create a new event for your website"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="eventTitle">Title *</Label>
                  <Input
                    id="eventTitle"
                    placeholder="e.g., Caravan Show 2025"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (!formData.slug) {
                        setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                      }
                    }}
                    required
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Label htmlFor="eventSlug">Slug (URL-friendly)</Label>
                  <Input
                    id="eventSlug"
                    placeholder="auto-generated from title"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="eventLocation">Location *</Label>
                  <Input
                    id="eventLocation"
                    placeholder="e.g., 123 Main St, City, State"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                {/* Event Date */}
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate ? format(formData.eventDate, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : undefined;
                      setFormData({ ...formData, eventDate: date });
                    }}
                    required
                  />
                </div>

                {/* Start Time */}
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>

                {/* End Time */}
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="eventImageURL">Event Image</Label>
                  <ImageUpload
                    value={formData.imageURL}
                    onChange={(url) => setFormData({ ...formData, imageURL: url })}
                    folder="events"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="eventDescription">Description *</Label>
                  <Textarea
                    id="eventDescription"
                    placeholder="Short description/preview text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                {/* Content (Markdown) */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="eventContent">Content (Markdown)</Label>
                  <Textarea
                    id="eventContent"
                    placeholder="# Event Details&#10;&#10;Write event details in Markdown format..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="eventTagInput">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      id="eventTagInput"
                      placeholder="Add a tag and press Enter"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag}>
                      Add Tag
                    </Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Is Featured */}
                <div className="flex items-center space-x-2 md:col-span-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <Label htmlFor="isFeatured" className="cursor-pointer">
                    Mark as Featured
                  </Label>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Events List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden">
                <Skeleton className="w-full aspect-[16/9]" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <AdminEventCard
                key={event.id}
                event={event}
                onEdit={() => handleEdit(event)}
                onDelete={() => handleDelete(event.id)}
                getValidImageUrl={getValidImageUrl}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No events found. Create your first event!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}

