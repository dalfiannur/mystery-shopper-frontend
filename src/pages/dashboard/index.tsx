import {useAuthorization} from '@/hooks/use-authorization.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainDashboard } from "@/components/main-dashboard.tsx"
import { Histories } from "@/components/histories.tsx"
import { ExpenseTracker } from "@/components/expense-tracker"
import { DeviceList } from "@/components/device-list.tsx"
import { MealPlanner } from "@/components/meal-planner"
import { Inventory } from "@/components/inventory"
import { DashboardHeader } from "@/components/dashboard-header"
import {HomeIcon, CalendarDays, CheckSquare, DollarSign, UtensilsCrossed, Package, Users} from 'lucide-react'
import { UserManagement } from "@/components/user-management"

export function DashboardPage() {
	// useAuthorization()
	return (
		<div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-fixed">
			<div className="absolute inset-0 bg-cover bg-center opacity-10"></div>
			<DashboardHeader />
			<main className="relative flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 z-10">
				<Tabs defaultValue="smart-home" className="space-y-4">
					<TabsList className="flex gap-2 mx-auto bg-white/10 backdrop-blur-md rounded-full p-1">
						<TabsTrigger value="smart-home" className="rounded-full flex items-center gap-2">
							<HomeIcon className="h-4 w-4" />
							<span className="hidden sm:inline">Dashboard</span>
						</TabsTrigger>
						<TabsTrigger value="histories" className="rounded-full flex items-center gap-2">
							<CalendarDays className="h-4 w-4" />
							<span className="hidden sm:inline">Histories</span>
						</TabsTrigger>
						<TabsTrigger value="devices" className="rounded-full flex items-center gap-2">
							<CheckSquare className="h-4 w-4" />
							<span className="hidden sm:inline">Devices</span>
						</TabsTrigger>
						<TabsTrigger value="users" className="rounded-full flex items-center gap-2">
							<Users className="h-4 w-4" />
							<span className="hidden sm:inline">Users</span>
						</TabsTrigger>
					</TabsList>
					<TabsContent value="smart-home" className="space-y-4">
						<MainDashboard />
					</TabsContent>
					<TabsContent value="histories" className="space-y-4">
						<Histories />
					</TabsContent>
					<TabsContent value="devices" className="space-y-4">
						<DeviceList />
					</TabsContent>
					<TabsContent value="expenses" className="space-y-4">
						<ExpenseTracker />
					</TabsContent>
					<TabsContent value="meals" className="space-y-4">
						<MealPlanner />
					</TabsContent>
					<TabsContent value="inventory" className="space-y-4">
						<Inventory />
					</TabsContent>
					<TabsContent value="users" className="space-y-4">
						<UserManagement />
					</TabsContent>
				</Tabs>
			</main>
		</div>
	)
}

export default DashboardPage