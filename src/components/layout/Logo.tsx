import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href="/" aria-label="Moussaoui Logo" className="block w-[140px] sm:w-[180px] md:w-[200px] lg:w-[232px] ">
          <Image
            src="/logo/figmaLogo.png"        
            alt="Moussaoui Logo"
            width={232}
            height={70}
            priority
            className="w-full h-auto"
          />
        </Link>
  )
}

export default Logo