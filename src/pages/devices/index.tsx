import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Device = {
	id: string
	text: string
	completed: boolean
	category: string
}

export function DeviceListPage() {
	const [devices, setDevices] = useState<Device[]>([
		{ id: "1", text: "Clean kitchen", completed: false, category: "agent" },
		{ id: "2", text: "Pay utility bills", completed: true, category: "cctv" },
	])
	const [newTodo, setNewTodo] = useState("")
	const [category, setCategory] = useState("agent")
	const [filter, setFilter] = useState("all")
	
	const handleAddTodo = () => {
		if (newTodo.trim() === "") return
		
		setDevices([
			...devices,
			{
				id: crypto.randomUUID(),
				text: newTodo,
				completed: false,
				category,
			},
		])
		setNewTodo("")
	}
	
	const toggleTodo = (id: string) => {
		setDevices(devices.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
	}
	
	const deleteTodo = (id: string) => {
		setDevices(devices.filter((todo) => todo.id !== id))
	}
	
	const filteredTodos = devices.filter((todo) => {
		if (filter === "all") return true
		if (filter === "completed") return todo.completed
		if (filter === "active") return !todo.completed
		return todo.category === filter
	})
	
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<Card className="bg-white/10 backdrop-blur-md border-0 text-white h-fit">
				<CardHeader>
					<CardTitle>Add New Device</CardTitle>
					<CardDescription className="text-gray-300">Add new your device here</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex space-x-2">
						<Input
							placeholder="Device name"
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") handleAddTodo()
							}}
							className="bg-white/10 border-gray-700 text-white"
						/>
						<Input
							placeholder="Device ID"
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") handleAddTodo()
							}}
							className="bg-white/10 border-gray-700 text-white"
						/>
						<Select value={category} onValueChange={setCategory}>
							<SelectTrigger className="w-[120px] bg-white/10 border-gray-700 text-white">
								<SelectValue placeholder="Category" />
							</SelectTrigger>
							<SelectContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
								<SelectItem value="agent">Agent</SelectItem>
								<SelectItem value="cctv">CCTV</SelectItem>
							</SelectContent>
						</Select>
						<Button onClick={handleAddTodo} className="bg-lime-400 text-black hover:bg-lime-500">
							<Plus className="h-4 w-4" />
						</Button>
					</div>
				</CardContent>
			</Card>
			
			<Card className="bg-white/10 backdrop-blur-md border-0 text-white">
				<CardHeader>
					<CardTitle>Device List</CardTitle>
					<CardDescription className="text-gray-300 flex items-center justify-between space-x-4">
						<div className="text-xs text-gray-400">{devices.filter((todo) => !todo.completed).length} devices</div>
						<Select value={filter} onValueChange={setFilter}>
							<SelectTrigger className="w-[120px] bg-white/10 border-gray-700 text-white">
								<SelectValue placeholder="Filter" />
							</SelectTrigger>
							<SelectContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
								<SelectItem value="all">All</SelectItem>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="inactive">Inactive</SelectItem>
								<SelectItem value="agent">Home</SelectItem>
								<SelectItem value="cctv">Finance</SelectItem>
							</SelectContent>
						</Select>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{filteredTodos.length === 0 ? (
							<div className="flex h-[200px] items-center justify-center rounded-md border border-gray-700 border-dashed">
								<div className="text-center">
									<h3 className="text-lg font-medium">No Devices</h3>
									<p className="text-sm text-gray-400">Add a device to get started</p>
								</div>
							</div>
						) : (
							filteredTodos.map((todo) => (
								<div
									key={todo.id}
									className="flex items-center justify-between rounded-lg border border-gray-700 bg-white/5 p-4"
								>
									<div className="flex items-center space-x-3">
										<Checkbox
											checked={todo.completed}
											onCheckedChange={() => toggleTodo(todo.id)}
											className="border-gray-600 data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
										/>
										<span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.text}</span>
										<Badge variant="outline" className="ml-2 border-gray-600 text-gray-300">
											{todo.category}
										</Badge>
									</div>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => deleteTodo(todo.id)}
										className="text-gray-400 hover:text-white hover:bg-white/10"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
