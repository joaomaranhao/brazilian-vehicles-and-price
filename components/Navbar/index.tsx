import { NextPage } from 'next'
import Link from 'next/link'

const Navbar: NextPage = () => {
  return (
    <nav className="flex">
      <Link href="/"><a><img src="logo-colors.svg" alt="João Maranhão"/></a></Link>
      <a href="https://www.joaomaranhao.com.br">Portfolio</a>
    </nav>
  )
}

export default Navbar
