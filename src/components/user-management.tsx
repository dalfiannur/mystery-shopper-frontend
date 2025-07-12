import { useState } from "react"
import { Plus, Trash2, Edit, Users, Shield, Mail, Phone, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type User = {
	id: string
	name: string
	email: string
	phone: string
	role: string
	avatar: string
	isActive: boolean
	permissions: {
		manageExpenses: boolean
		manageTodos: boolean
		manageCalendar: boolean
		manageDevices: boolean
	}
}

export function UserManagement() {
	const [users, setUsers] = useState<User[]>([
		{
			id: "1",
			name: "John Doe",
			email: "john@example.com",
			phone: "+1 (555) 123-4567",
			role: "admin",
			avatar: "/placeholder.svg?height=100&width=100",
			isActive: true,
			permissions: {
				manageExpenses: true,
				manageTodos: true,
				manageCalendar: true,
				manageDevices: true,
			},
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane@example.com",
			phone: "+1 (555) 987-6543",
			role: "member",
			avatar: "/placeholder.svg?height=100&width=100",
			isActive: true,
			permissions: {
				manageExpenses: true,
				manageTodos: true,
				manageCalendar: false,
				manageDevices: false,
			},
		},
		{
			id: "3",
			name: "Alex Johnson",
			email: "alex@example.com",
			phone: "+1 (555) 456-7890",
			role: "child",
			avatar: "/placeholder.svg?height=100&width=100",
			isActive: true,
			permissions: {
				manageExpenses: false,
				manageTodos: true,
				manageCalendar: false,
				manageDevices: false,
			},
		},
	])
	
	const [newUser, setNewUser] = useState({
		name: "",
		email: "",
		phone: "",
		role: "member",
	})
	
	const [editingUser, setEditingUser] = useState<User | null>(null)
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	
	const handleAddUser = () => {
		if (newUser.name.trim() === "" || newUser.email.trim() === "") return
		
		const user: User = {
			id: crypto.randomUUID(),
			...newUser,
			avatar: "/placeholder.svg?height=100&width=100",
			isActive: true,
			permissions: {
				manageExpenses: newUser.role === "admin",
				manageTodos: true,
				manageCalendar: newUser.role === "admin",
				manageDevices: newUser.role === "admin",
			},
		}
		
		setUsers([...users, user])
		setNewUser({
			name: "",
			email: "",
			phone: "",
			role: "member",
		})
		setIsAddDialogOpen(false)
	}
	
	const handleEditUser = () => {
		if (!editingUser) return
		
		setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)))
		setEditingUser(null)
		setIsEditDialogOpen(false)
	}
	
	const deleteUser = (id: string) => {
		setUsers(users.filter((user) => user.id !== id))
	}
	
	const toggleUserStatus = (id: string) => {
		setUsers(users.map((user) => (user.id === id ? { ...user, isActive: !user.isActive } : user)))
	}
	
	const updateUserPermission = (userId: string, permission: keyof User["permissions"], value: boolean) => {
		setUsers(
			users.map((user) =>
				user.id === userId
					? {
						...user,
						permissions: {
							...user.permissions,
							[permission]: value,
						},
					}
					: user,
			),
		)
	}
	
	const getRoleLabel = (role: string) => {
		switch (role) {
			case "admin":
				return "Administrator"
			case "member":
				return "Family Member"
			case "child":
				return "Child"
			case "guest":
				return "Guest"
			default:
				return role.charAt(0).toUpperCase() + role.slice(1)
		}
	}
	
	const getRoleBadgeColor = (role: string) => {
		switch (role) {
			case "admin":
				return "bg-red-500/20 text-red-400 border-red-500/30"
			case "member":
				return "bg-blue-500/20 text-blue-400 border-blue-500/30"
			case "child":
				return "bg-green-500/20 text-green-400 border-green-500/30"
			case "guest":
				return "bg-gray-500/20 text-gray-400 border-gray-500/30"
			default:
				return "bg-gray-500/20 text-gray-400 border-gray-500/30"
		}
	}
	
	return (
		<div className="grid gap-4 md:grid-cols-3">
			<Card className="md:col-span-2 bg-white/10 backdrop-blur-md border-0 text-white">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400/20">
								<Users className="h-4 w-4 text-lime-400" />
							</div>
							<div>
								<CardTitle>Family Members</CardTitle>
								<CardDescription className="text-gray-300">Manage household users and permissions</CardDescription>
							</div>
						</div>
						<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
							<DialogTrigger asChild>
								<Button className="bg-lime-400 text-black hover:bg-lime-500">
									<Plus className="mr-2 h-4 w-4" />
									Add User
								</Button>
							</DialogTrigger>
							<DialogContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
								<DialogHeader>
									<DialogTitle>Add New User</DialogTitle>
									<DialogDescription className="text-gray-400">Add a new family member to your home</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid gap-2">
										<Label htmlFor="name">Full Name</Label>
										<Input
											id="name"
											value={newUser.name}
											onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
											className="bg-white/10 border-gray-700 text-white"
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											value={newUser.email}
											onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
											className="bg-white/10 border-gray-700 text-white"
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="phone">Phone</Label>
										<Input
											id="phone"
											value={newUser.phone}
											onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
											className="bg-white/10 border-gray-700 text-white"
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="role">Role</Label>
										<Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
											<SelectTrigger className="bg-white/10 border-gray-700 text-white">
												<SelectValue placeholder="Select role" />
											</SelectTrigger>
											<SelectContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
												<SelectItem value="admin">Administrator</SelectItem>
												<SelectItem value="member">Family Member</SelectItem>
												<SelectItem value="child">Child</SelectItem>
												<SelectItem value="guest">Guest</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<DialogFooter>
									<Button onClick={handleAddUser} className="bg-lime-400 text-black hover:bg-lime-500">
										Add User
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{users.map((user) => (
							<div key={user.id} className="rounded-lg border border-gray-700 bg-white/5 p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Avatar className="h-12 w-12">
											<AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
											<AvatarFallback className="bg-lime-400/20 text-lime-400">
												{user.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div>
											<div className="flex items-center gap-2">
												<h3 className="font-medium">{user.name}</h3>
												<Badge className={getRoleBadgeColor(user.role)}>{getRoleLabel(user.role)}</Badge>
												{!user.isActive && (
													<Badge variant="outline" className="border-gray-600 text-gray-400">
														Inactive
													</Badge>
												)}
											</div>
											<div className="flex items-center gap-4 text-sm text-gray-400">
												<div className="flex items-center gap-1">
													<Mail className="h-3 w-3" />
													{user.email}
												</div>
												{user.phone && (
													<div className="flex items-center gap-1">
														<Phone className="h-3 w-3" />
														{user.phone}
													</div>
												)}
											</div>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Switch
											checked={user.isActive}
											onCheckedChange={() => toggleUserStatus(user.id)}
											className="data-[state=checked]:bg-lime-400"
										/>
										<Dialog
											open={isEditDialogOpen && editingUser?.id === user.id}
											onOpenChange={(open) => {
												setIsEditDialogOpen(open)
												if (!open) setEditingUser(null)
											}}
										>
											<DialogTrigger asChild>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => setEditingUser(user)}
													className="text-gray-400 hover:text-white hover:bg-white/10"
												>
													<Edit className="h-4 w-4" />
												</Button>
											</DialogTrigger>
											<DialogContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white max-w-2xl">
												<DialogHeader>
													<DialogTitle>Edit User</DialogTitle>
													<DialogDescription className="text-gray-400">
														Update user information and permissions
													</DialogDescription>
												</DialogHeader>
												{editingUser && (
													<Tabs defaultValue="profile" className="w-full">
														<TabsList className="grid w-full grid-cols-2 bg-white/10">
															<TabsTrigger value="profile">Profile</TabsTrigger>
															<TabsTrigger value="permissions">Permissions</TabsTrigger>
														</TabsList>
														<TabsContent value="profile" className="space-y-4">
															<div className="grid gap-2">
																<Label htmlFor="edit-name">Full Name</Label>
																<Input
																	id="edit-name"
																	value={editingUser.name}
																	onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
																	className="bg-white/10 border-gray-700 text-white"
																/>
															</div>
															<div className="grid gap-2">
																<Label htmlFor="edit-email">Email</Label>
																<Input
																	id="edit-email"
																	type="email"
																	value={editingUser.email}
																	onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
																	className="bg-white/10 border-gray-700 text-white"
																/>
															</div>
															<div className="grid gap-2">
																<Label htmlFor="edit-phone">Phone</Label>
																<Input
																	id="edit-phone"
																	value={editingUser.phone}
																	onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
																	className="bg-white/10 border-gray-700 text-white"
																/>
															</div>
															<div className="grid gap-2">
																<Label htmlFor="edit-role">Role</Label>
																<Select
																	value={editingUser.role}
																	onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
																>
																	<SelectTrigger className="bg-white/10 border-gray-700 text-white">
																		<SelectValue placeholder="Select role" />
																	</SelectTrigger>
																	<SelectContent className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
																		<SelectItem value="admin">Administrator</SelectItem>
																		<SelectItem value="member">Family Member</SelectItem>
																		<SelectItem value="child">Child</SelectItem>
																		<SelectItem value="guest">Guest</SelectItem>
																	</SelectContent>
																</Select>
															</div>
														</TabsContent>
														<TabsContent value="permissions" className="space-y-4">
															<div className="space-y-4">
																<div className="flex items-center justify-between">
																	<div>
																		<Label>Manage Expenses</Label>
																		<p className="text-sm text-gray-400">Can add, edit, and delete expenses</p>
																	</div>
																	<Switch
																		checked={editingUser.permissions.manageExpenses}
																		onCheckedChange={(checked) =>
																			setEditingUser({
																				...editingUser,
																				permissions: { ...editingUser.permissions, manageExpenses: checked },
																			})
																		}
																		className="data-[state=checked]:bg-lime-400"
																	/>
																</div>
																<div className="flex items-center justify-between">
																	<div>
																		<Label>Manage Todos</Label>
																		<p className="text-sm text-gray-400">Can create and manage todo items</p>
																	</div>
																	<Switch
																		checked={editingUser.permissions.manageTodos}
																		onCheckedChange={(checked) =>
																			setEditingUser({
																				...editingUser,
																				permissions: { ...editingUser.permissions, manageTodos: checked },
																			})
																		}
																		className="data-[state=checked]:bg-lime-400"
																	/>
																</div>
																<div className="flex items-center justify-between">
																	<div>
																		<Label>Manage Calendar</Label>
																		<p className="text-sm text-gray-400">Can create and manage calendar events</p>
																	</div>
																	<Switch
																		checked={editingUser.permissions.manageCalendar}
																		onCheckedChange={(checked) =>
																			setEditingUser({
																				...editingUser,
																				permissions: { ...editingUser.permissions, manageCalendar: checked },
																			})
																		}
																		className="data-[state=checked]:bg-lime-400"
																	/>
																</div>
																<div className="flex items-center justify-between">
																	<div>
																		<Label>Manage Smart Devices</Label>
																		<p className="text-sm text-gray-400">Can control smart home devices</p>
																	</div>
																	<Switch
																		checked={editingUser.permissions.manageDevices}
																		onCheckedChange={(checked) =>
																			setEditingUser({
																				...editingUser,
																				permissions: { ...editingUser.permissions, manageDevices: checked },
																			})
																		}
																		className="data-[state=checked]:bg-lime-400"
																	/>
																</div>
															</div>
														</TabsContent>
													</Tabs>
												)}
												<DialogFooter>
													<Button onClick={handleEditUser} className="bg-lime-400 text-black hover:bg-lime-500">
														Save Changes
													</Button>
												</DialogFooter>
											</DialogContent>
										</Dialog>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => deleteUser(user.id)}
											className="text-gray-400 hover:text-white hover:bg-white/10"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
			
			<div className="space-y-4">
				<Card className="bg-white/10 backdrop-blur-md border-0 text-white">
					<CardHeader>
						<CardTitle>User Statistics</CardTitle>
						<CardDescription className="text-gray-300">Overview of family members</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span>Total Users</span>
								<span className="font-bold">{users.length}</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Active Users</span>
								<span className="font-bold">{users.filter((u) => u.isActive).length}</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Administrators</span>
								<span className="font-bold">{users.filter((u) => u.role === "admin").length}</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Family Members</span>
								<span className="font-bold">{users.filter((u) => u.role === "member").length}</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Children</span>
								<span className="font-bold">{users.filter((u) => u.role === "child").length}</span>
							</div>
						</div>
					</CardContent>
				</Card>
				
				<Card className="bg-white/10 backdrop-blur-md border-0 text-white">
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
						<CardDescription className="text-gray-300">Common user management tasks</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<Button
								variant="outline"
								className="w-full justify-start bg-white/5 border-gray-700 text-white hover:bg-white/10"
							>
								<Shield className="mr-2 h-4 w-4" />
								Manage Permissions
							</Button>
							<Button
								variant="outline"
								className="w-full justify-start bg-white/5 border-gray-700 text-white hover:bg-white/10"
							>
								<Mail className="mr-2 h-4 w-4" />
								Send Invitations
							</Button>
							<Button
								variant="outline"
								className="w-full justify-start bg-white/5 border-gray-700 text-white hover:bg-white/10"
							>
								<Camera className="mr-2 h-4 w-4" />
								Update Avatars
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
