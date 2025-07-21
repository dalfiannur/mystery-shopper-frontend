import {DashboardHeader} from '@/components/dashboard-header'
import {CalendarDays, CheckSquare, HomeIcon, Users} from 'lucide-react'
import {Outlet, useLocation, useNavigate} from 'react-router'
import {type ComponentProps, type FC, useCallback} from 'react'

interface NavigationItemProps {
	active?: boolean
	label: string
	path: string
	Icon: FC<ComponentProps<'svg'>>
}

function NavigationItem({active, label, path, Icon}: NavigationItemProps) {
	const navigate = useNavigate()
	return (
		<button data-active={active} onClick={() => navigate(path)}
				className="text-white hover:cursor-pointer rounded-full flex items-center gap-2 data-active:border data-active:bg-gray-400 border-gray-500 px-4 py-1 data-active:*:text-black">
			<Icon className="h-4 w-4"/>
			<span className="hidden sm:inline">{label}</span>
		</button>)
}

export function MainLayout() {
	// useAuthorization()
	const location = useLocation()
	const isActive = useCallback((path: string) => location.pathname === path ? true : undefined, [location])
	
	return (
		<div
			className="flex min-h-screen w-full flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-fixed">
			<div className="absolute inset-0 bg-cover bg-center opacity-10"></div>
			<DashboardHeader/>
			<main className="relative flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 z-10">
				<div defaultValue="smart-home" className="space-y-4">
					<div className="flex gap-2 mx-auto w-fit bg-white/10 backdrop-blur-md rounded-full p-2">
						<NavigationItem label="Dashboard" path="/" Icon={HomeIcon} active={isActive('/')}/>
						<NavigationItem label="Histories" path="/histories" Icon={CalendarDays}
										active={isActive('/histories')}/>
						<NavigationItem label="Devices" path="/devices" Icon={CheckSquare}
										active={isActive('/devices')}/>
						<NavigationItem label="Users" path="/users" Icon={Users} active={isActive('/users')}/>
					</div>
					<Outlet/>
				</div>
			</main>
		</div>
	)
}