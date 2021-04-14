import { NextPage } from 'next'
import Link from 'next/link'

const Navbar: NextPage = () => {
  return (
    <nav className="flex p-4 h-20 items-center justify-between bg-transparent">
      <Link href="https://www.joaomaranhao.com.br">
        <a>
          <img src="logo-colors.svg" alt="João Maranhão" className="h-16"/>
        </a>
      </Link>
      <a href="https://www.joaomaranhao.com.br/portfolio" className="bg-blue-600 text-gray-100 px-6 py-2 font-semibold hover:bg-blue-500 duration-200">Portfolio</a>
    </nav>
  )
}

export default Navbar
