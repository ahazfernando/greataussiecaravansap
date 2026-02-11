"use client";

import { MapPin, Phone, Mail, Wrench, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceAgent {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  services?: string[];
  hours: string;
  certified: boolean;
}

interface ServiceAgentCardProps {
  agent: ServiceAgent;
  index?: number;
}

export const ServiceAgentCard = ({ agent, index }: ServiceAgentCardProps) => {
  return (
    <div
      className={`service-agent-card bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-accent/30 transition-all flex flex-col h-full ${
        index !== undefined ? "animate-slide-in-right" : ""
      }`}
      style={index !== undefined ? { animationDelay: `${index * 100}ms` } : {}}
    >
      {/* Agent Name */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-white">
          {agent.name}
        </h3>
        {agent.certified && (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-2 py-1 text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            Certified
          </Badge>
        )}
      </div>

      {/* Location Badge */}
      <Badge className="mb-4 w-fit bg-accent/20 text-accent border-accent/30 px-3 py-1">
        <MapPin className="h-3 w-3 mr-1" />
        {agent.city}, {agent.state}
      </Badge>

      {/* Services Offered */}
      {agent.services && agent.services.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-white">Services:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {agent.services.map((service, idx) => (
              <Badge
                key={idx}
                className="text-xs bg-gray-800 text-gray-300 border border-gray-700"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="space-y-3 mb-6 flex-grow">
        <div className="flex items-start gap-2 text-sm text-white">
          <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
          <span>{agent.address}, {agent.city}, {agent.state}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white">
          <Phone className="h-4 w-4 text-accent flex-shrink-0" />
          <a
            href={`tel:${agent.phone}`}
            className="hover:text-accent transition-colors"
          >
            {agent.phone}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-white">
          <Mail className="h-4 w-4 text-accent flex-shrink-0" />
          <a
            href={`mailto:${agent.email}`}
            className="hover:text-accent transition-colors"
          >
            {agent.email}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-white">
          <Clock className="h-4 w-4 text-accent flex-shrink-0" />
          <span>{agent.hours}</span>
        </div>
      </div>

      {/* Contact Agent Button */}
      <Button
        variant="accent"
        className="w-full text-black font-medium"
        asChild
      >
        <a href={`mailto:${agent.email}?subject=Service Inquiry for Great Aussie Caravan`}>
          Contact Agent
        </a>
      </Button>
    </div>
  );
};

export default ServiceAgentCard;

