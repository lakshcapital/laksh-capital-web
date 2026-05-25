import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import Image from "next/image";
import dhruvalImg from "@/assets/team/dhruval.jpeg";
import siddharthImg from "@/assets/team/siddharth.jpeg";
import punitImg from "@/assets/team/punit.jpeg";
import rachitImg from "@/assets/team/rachit.jpeg";
import hardikImg from "@/assets/team/hardik.jpeg";
import { getAllTeamMembers } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface TeamProps {
  className?: string;
}

interface MemberProps {
  member: TeamMemberItem;
  className?: string;
}

const FALLBACK_MEMBERS: TeamMemberItem[] = [
  { id: "fallback-1", name: "CA Dhruval Shah", role: "Founder & Managing Director", avatar: dhruvalImg.src },
  { id: "fallback-2", name: "CA Siddharth Mehta", role: "Head of Overseas Investments", avatar: siddharthImg.src },
  { id: "fallback-3", name: "CA Punit Sheth", role: "Head of Strategy", avatar: punitImg.src },
  { id: "fallback-4", name: "CA Rachit Diyora", role: "Business Development", avatar: rachitImg.src },
  { id: "fallback-5", name: "CA Hardik Mehta", role: "Head of Investments", avatar: hardikImg.src },
];

const Member = ({ member, className }: MemberProps) => {
  return (
    <div
      className={cn(
        "rounded-xl shadow-xs overflow-hidden border border-neutral-300 lg:mt-0",
        className
      )}
    >
      <div className="lg:mt-0 h-72" style={{ clipPath: "inset(0%)" }}>
        <Image
          width={320}
          height={540}
          alt={member.name}
          className="pointer-events-none h-full w-full object-cover object-top"
          src={member.avatar}
        />
      </div>
      <div className="p-4">
        <p className="font-semibold tracking-tight text-foreground lg:text-lg">
          {member.name}
        </p>
        <p className="font-medium text-muted-foreground">{member.role}</p>
      </div>
    </div>
  );
};

const Team = async ({ className }: TeamProps) => {
  const sanity = await getAllTeamMembers();
  const members: TeamMemberItem[] = sanity.length
    ? sanity.map((m) => ({
        id: m._id,
        name: m.name,
        role: m.role,
        avatar: urlFor(m.avatar).width(640).height(720).fit("crop").url(),
      }))
    : FALLBACK_MEMBERS;

  const firstRow = members.slice(0, 3);
  const secondRow = members.slice(3);

  return (
    <section
      id="team"
      className={cn("py-16 md:py-24 lg:py-28 bg-accent", className)}
    >
      <div className="container flex flex-col items-center text-center">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Users className="size-4 text-foreground" />
            <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              OUR TEAM
            </p>
          </div>
          <h2 className="mb-4 text-3xl md:text-5xl lg:text-6xl">
            <span className="font-semibold text-foreground">
              Building the Future
            </span>{" "}
            <span className="font-medium text-muted-foreground italic">
              Together
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our dedicated team of financial experts works together to deliver
            thoughtful, transparent, and goal-driven wealth solutions.
          </p>
        </div>
      </div>
      <div className="container flex flex-col justify-center items-center gap-8 mb-8 md:flex-row">
        {firstRow.map((m) => (
          <Member key={m.id} member={m} />
        ))}
      </div>
      {secondRow.length > 0 && (
        <div className="container flex flex-col justify-center items-center gap-8 md:flex-row">
          {secondRow.map((m) => (
            <Member key={m.id} member={m} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Team;
