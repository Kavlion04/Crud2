import React from "react";
import { Contact } from "@/types";
import {
  Briefcase,
  Building,
  Phone,
  Smartphone,
  Mail,
  Linkedin,
  Twitter,
  Github,
  Edit,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onEdit,
  onDelete,
}) => {
  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    if (!names[0] || names[0] === "") return "";
    if (names.length === 1) return names[0][0]?.toUpperCase() || "";
    return (names[0][0] + (names[names.length - 1][0] || "")).toUpperCase();
  };

  const avatarSrc =
    contact.avatarUrl ||
    `https://avatar.vercel.sh/${contact.email || contact.name}.png`;

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-out animate-scale-in flex flex-col">
      <div className="flex items-center mb-4">
        <Avatar className="h-20 w-20 mr-4 border-2 border-primary">
          <AvatarImage src={avatarSrc} alt={contact.name} />
          <AvatarFallback className="text-2xl bg-primary text-primary-foreground font-semibold">
            {getInitials(contact.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold text-primary">{contact.name}</h2>
          <p className="text-sm text-muted-foreground flex items-center">
            <Briefcase size={14} className="mr-2" /> {contact.jobTitle}
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            <Building size={14} className="mr-2" /> {contact.department}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm mb-4 flex-grow">
        {contact.officePhone && (
          <p className="flex items-center">
            <Phone size={14} className="mr-2 text-primary/70" />{" "}
            {contact.officePhone}
          </p>
        )}
        {contact.mobile && (
          <p className="flex items-center">
            <Smartphone size={14} className="mr-2 text-primary/70" />{" "}
            {contact.mobile}
          </p>
        )}
        <p className="flex items-center">
          <Mail size={14} className="mr-2 text-primary/70" /> {contact.email}
        </p>
      </div>

      {(contact.linkedin || contact.twitter || contact.github) && (
        <div className="flex space-x-3 mt-auto border-t border-border pt-4 mb-4">
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
            </a>
          )}
          {contact.twitter && (
            <a
              href={contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter size={20} />
            </a>
          )}
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={20} />
            </a>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-auto">
        <button
          onClick={() => onEdit(contact)}
          className="btn btn-ghost p-2 hover:bg-accent rounded-full"
          aria-label="Edit contact"
        >
          <Edit size={18} />
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="btn btn-ghost p-2 text-destructive hover:bg-destructive/10 rounded-full"
              aria-label="Delete contact"
            >
              <Trash2 size={18} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                contact
                {contact.name && ` "${contact.name}"`}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(contact.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ContactCard;
