import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Article } from "@/types/article";
import { Review as ReviewType } from "@/types/review";
import { Review as AdminReview } from "@/types/admin";
import { Inquiry } from "@/types/inquiry";
import { Event } from "@/types/event";
import { generateSlug } from "./blog-utils";

// Blog Functions
export const createBlog = async (blogData: {
  title: string;
  excerpt: string;
  content: string;
  imageURL?: string;
  tags?: string[];
  authorName: string;
  authorAvatarURL?: string;
  isPopular?: boolean;
  slug?: string;
}) => {
  if (!blogData.title || !blogData.excerpt || !blogData.content || !blogData.authorName) {
    throw new Error("Please fill all required fields");
  }

  const slug = blogData.slug || generateSlug(blogData.title);
  const now = Timestamp.now();

  const articleData = {
    slug,
    title: blogData.title,
    excerpt: blogData.excerpt,
    content: blogData.content,
    imageURL: blogData.imageURL || '/blogs/blog1.png',
    tags: blogData.tags || [],
    author: {
      name: blogData.authorName,
      avatarURL: blogData.authorAvatarURL || '',
    },
    date: now,
    createdAt: now,
    lastUpdated: now,
    isPopular: blogData.isPopular || false,
  };

  await addDoc(collection(db, 'blogs'), articleData);
  return { success: true, message: "Blog post created successfully" };
};

export const updateBlog = async (
  blogId: string,
  blogData: {
    title: string;
    excerpt: string;
    content: string;
    imageURL?: string;
    tags?: string[];
    authorName: string;
    authorAvatarURL?: string;
    isPopular?: boolean;
    slug?: string;
  }
) => {
  if (!blogData.title || !blogData.excerpt || !blogData.content || !blogData.authorName) {
    throw new Error("Please fill all required fields");
  }

  const slug = blogData.slug || generateSlug(blogData.title);

  const updateData = {
    slug,
    title: blogData.title,
    excerpt: blogData.excerpt,
    content: blogData.content,
    imageURL: blogData.imageURL || '/blogs/blog1.png',
    tags: blogData.tags || [],
    author: {
      name: blogData.authorName,
      avatarURL: blogData.authorAvatarURL || '',
    },
    lastUpdated: Timestamp.now(),
    isPopular: blogData.isPopular || false,
  };

  await updateDoc(doc(db, 'blogs', blogId), updateData);
  return { success: true, message: "Blog post updated successfully" };
};

export const deleteBlog = async (blogId: string) => {
  await deleteDoc(doc(db, 'blogs', blogId));
  return { success: true, message: "Blog post deleted successfully" };
};

// Review Functions (New Admin Structure)
export const createReview = async (reviewData: Omit<AdminReview, "id" | "createdAt">) => {
  if (!reviewData.reviewerName || !reviewData.starRating || !reviewData.reviewText) {
    throw new Error("Please fill all required fields");
  }

  const now = Timestamp.now();

  const review = {
    reviewerName: reviewData.reviewerName,
    starRating: reviewData.starRating,
    reviewText: reviewData.reviewText,
    purchasedCaravanModel: reviewData.purchasedCaravanModel,
    reviewMonth: reviewData.reviewMonth,
    reviewYear: reviewData.reviewYear,
    publishStatus: reviewData.publishStatus,
    createdAt: now,
    lastUpdated: now,
  };

  await addDoc(collection(db, 'reviews'), review);
  return { success: true, message: "Review created successfully" };
};

export const updateReview = async (
  reviewId: string,
  reviewData: Omit<AdminReview, "id" | "createdAt">
) => {
  if (!reviewData.reviewerName || !reviewData.starRating || !reviewData.reviewText) {
    throw new Error("Please fill all required fields");
  }

  const updateData = {
    reviewerName: reviewData.reviewerName,
    starRating: reviewData.starRating,
    reviewText: reviewData.reviewText,
    purchasedCaravanModel: reviewData.purchasedCaravanModel,
    reviewMonth: reviewData.reviewMonth,
    reviewYear: reviewData.reviewYear,
    publishStatus: reviewData.publishStatus,
    lastUpdated: Timestamp.now(),
  };

  await updateDoc(doc(db, 'reviews', reviewId), updateData);
  return { success: true, message: "Review updated successfully" };
};

export const deleteReview = async (reviewId: string) => {
  await deleteDoc(doc(db, 'reviews', reviewId));
  return { success: true, message: "Review deleted successfully" };
};

export const fetchAllReviews = async (): Promise<AdminReview[]> => {
  const querySnapshot = await getDocs(collection(db, 'reviews'));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      reviewerName: data.reviewerName || '',
      starRating: data.starRating || 5,
      reviewText: data.reviewText || '',
      purchasedCaravanModel: data.purchasedCaravanModel || '',
      reviewMonth: data.reviewMonth || 'January',
      reviewYear: data.reviewYear || new Date().getFullYear(),
      publishStatus: data.publishStatus || 'published',
      createdAt: data.createdAt,
      lastUpdated: data.lastUpdated,
    } as AdminReview;
  });
};

// Inquiry Functions
export const updateInquiryStatus = async (inquiryId: string, status: 'new' | 'read' | 'replied') => {
  await updateDoc(doc(db, 'inquiries', inquiryId), {
    status,
    lastUpdated: Timestamp.now(),
  });
  return { success: true, message: "Inquiry status updated successfully" };
};

export const deleteInquiry = async (inquiryId: string) => {
  await deleteDoc(doc(db, 'inquiries', inquiryId));
  return { success: true, message: "Inquiry deleted successfully" };
};

export const createInquiry = async (inquiryData: Omit<Inquiry, "id" | "createdAt" | "status">) => {
  const now = Timestamp.now();
  const inquiry = {
    name: inquiryData.name,
    email: inquiryData.email,
    phone: inquiryData.phone || '',
    subject: inquiryData.subject,
    message: inquiryData.message,
    status: 'new' as const,
    createdAt: now,
  };
  await addDoc(collection(db, 'inquiries'), inquiry);
  return { success: true, message: "Inquiry created successfully" };
};

export const fetchAllInquiries = async (): Promise<Inquiry[]> => {
  const querySnapshot = await getDocs(collection(db, 'inquiries'));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      subject: data.subject || '',
      message: data.message || '',
      status: data.status || 'new',
      createdAt: data.createdAt,
    } as Inquiry;
  });
};

export const fetchAllBlogs = async (): Promise<Article[]> => {
  const querySnapshot = await getDocs(collection(db, 'blogs'));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      slug: data.slug || '',
      title: data.title || '',
      excerpt: data.excerpt || '',
      imageURL: data.imageURL || '',
      tags: data.tags || [],
      content: data.content || '',
      author: data.author || { name: 'Unknown', avatarURL: '' },
      date: data.date?.toDate?.().toISOString() || new Date().toISOString(),
      createdAt: data.createdAt?.toDate?.().toISOString() || new Date().toISOString(),
      lastUpdated: data.lastUpdated?.toDate?.().toISOString() || new Date().toISOString(),
      isPopular: data.isPopular || false,
    } as Article;
  });
};

// Event Functions
export const createEvent = async (eventData: {
  title: string;
  description: string;
  content?: string;
  imageURL?: string;
  location: string;
  eventDate: Date;
  startTime?: string;
  endTime?: string;
  tags?: string[];
  isFeatured?: boolean;
  slug?: string;
}) => {
  if (!eventData.title || !eventData.description || !eventData.location || !eventData.eventDate) {
    throw new Error("Please fill all required fields");
  }

  const slug = eventData.slug || generateSlug(eventData.title);
  const now = Timestamp.now();
  const eventDateTimestamp = Timestamp.fromDate(eventData.eventDate);

  const event = {
    slug,
    title: eventData.title,
    description: eventData.description,
    content: eventData.content || '',
    imageURL: eventData.imageURL || '/events/event1.png',
    location: eventData.location,
    eventDate: eventDateTimestamp,
    startTime: eventData.startTime || '',
    endTime: eventData.endTime || '',
    tags: eventData.tags || [],
    createdAt: now,
    lastUpdated: now,
    isFeatured: eventData.isFeatured || false,
  };

  await addDoc(collection(db, 'events'), event);
  return { success: true, message: "Event created successfully" };
};

export const updateEvent = async (
  eventId: string,
  eventData: {
    title: string;
    description: string;
    content?: string;
    imageURL?: string;
    location: string;
    eventDate: Date;
    startTime?: string;
    endTime?: string;
    tags?: string[];
    isFeatured?: boolean;
    slug?: string;
  }
) => {
  if (!eventData.title || !eventData.description || !eventData.location || !eventData.eventDate) {
    throw new Error("Please fill all required fields");
  }

  const slug = eventData.slug || generateSlug(eventData.title);
  const eventDateTimestamp = Timestamp.fromDate(eventData.eventDate);

  const updateData = {
    slug,
    title: eventData.title,
    description: eventData.description,
    content: eventData.content || '',
    imageURL: eventData.imageURL || '/events/event1.png',
    location: eventData.location,
    eventDate: eventDateTimestamp,
    startTime: eventData.startTime || '',
    endTime: eventData.endTime || '',
    tags: eventData.tags || [],
    lastUpdated: Timestamp.now(),
    isFeatured: eventData.isFeatured || false,
  };

  await updateDoc(doc(db, 'events', eventId), updateData);
  return { success: true, message: "Event updated successfully" };
};

export const deleteEvent = async (eventId: string) => {
  await deleteDoc(doc(db, 'events', eventId));
  return { success: true, message: "Event deleted successfully" };
};

export const fetchAllEvents = async (): Promise<Event[]> => {
  const querySnapshot = await getDocs(collection(db, 'events'));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      slug: data.slug || '',
      title: data.title || '',
      description: data.description || '',
      content: data.content || '',
      imageURL: data.imageURL || '',
      location: data.location || '',
      eventDate: data.eventDate,
      startTime: data.startTime || '',
      endTime: data.endTime || '',
      tags: data.tags || [],
      createdAt: data.createdAt,
      lastUpdated: data.lastUpdated,
      isFeatured: data.isFeatured || false,
    } as Event;
  });
};

