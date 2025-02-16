import { Twitter, Linkedin, Github } from "lucide-react";

export default function ContactLinks() {
  return (
    <div className="flex space-x-4 ">
      <a
        href="https://x.com/vai_shhh27"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full border border-slate-400 text-gray-400 transition-colors"
      >
        <Twitter size={26} />
        <span className="sr-only">Twitter</span>
      </a>
      <a
        href="https://www.linkedin.com/in/vaishnavi-patil27/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full border border-slate-400 text-gray-500 transition-colors"
      >
        <Linkedin size={26} />
        <span className="sr-only">LinkedIn</span>
      </a>
      <a
        href="https://github.com/vaishnavip27"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full border border-slate-400 text-gray-500 transition-colors"
      >
        <Github size={26} />
        <span className="sr-only">GitHub</span>
      </a>
    </div>
  );
}
