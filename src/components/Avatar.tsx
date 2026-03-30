import "@/styles/avatar.scss"

interface AvatarProps {
  initials: string
}

export default function Avatar({ initials }: AvatarProps) {
  return (
    <span className="avatar">{initials}</span>
  )
}
