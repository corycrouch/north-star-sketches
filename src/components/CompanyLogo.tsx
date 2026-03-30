import "@/styles/company-logo.scss"

interface CompanyLogoProps {
  domain: string
  size?: number
  card?: boolean
}

export default function CompanyLogo({ domain, size = 24, card }: CompanyLogoProps) {
  return (
    <img
      className={`company-logo ${card ? "company-logo--card" : ""}`}
      src={`https://logos.hunter.io/${domain}`}
      alt=""
      width={size}
      height={size}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none"
      }}
    />
  )
}
