import Image from 'next/image'

type BrandLogoProps = {
  size?: number
  className?: string
  priority?: boolean
}

export default function BrandLogo({
  size = 40,
  className = '',
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="STRMindCare"
      width={size}
      height={size}
      className={`rounded-2xl shadow-sm ring-1 ring-sky-200/70 ${className}`}
      priority={priority}
    />
  )
}
