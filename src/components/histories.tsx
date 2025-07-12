import { useState } from "react"
import {CalendarArrowDown, CalendarIcon, Plus} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

type Event = {
	id: string
	title: string
	description: string
	date: Date
}

export function Histories() {
	const [date, setDate] = useState<Date>(new Date())
	const [events, setEvents] = useState<Event[]>([
		{
			id: "1",
			title: "Family Dinner",
			description: "Weekly family dinner at home",
			date: new Date(),
		},
		{
			id: "2",
			title: "Home Maintenance",
			description: "Check smoke detectors and replace filters",
			date: new Date(2025, 2, 20, 10, 0),
		},
	])
	const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
		title: "",
		description: "",
		date: new Date(),
	})
	
	const handleAddEvent = () => {
		if (newEvent.title.trim() === "") return
		
		setEvents([...events, { ...newEvent, id: crypto.randomUUID() }])
		setNewEvent({
			title: "",
			description: "",
			date: new Date(),
		})
	}
	
	const eventsForSelectedDate = events.filter((event) => event.date.toDateString() === date.toDateString())
	
	return (
		<div className="flex gap-4">
			<Card className="bg-white/10 backdrop-blur-md border-0 text-white h-fit">
				<CardHeader>
					<CardTitle>Calendar</CardTitle>
					<CardDescription className="text-gray-300">View and manage your histories</CardDescription>
				</CardHeader>
				<CardContent className="py-0 px-8">
					<CalendarComponent
						mode="single"
						captionLayout="dropdown"
					/>
				</CardContent>
			</Card>
			<Card className="flex-1 bg-white/10 backdrop-blur-md border-0 text-white">
				<CardHeader>
					<CardTitle>Videos for {format(date, "MMMM d, yyyy")}</CardTitle>
					<CardDescription className="text-gray-300">
						{eventsForSelectedDate.length === 0
							? "No videos recorded for this day"
							: `${eventsForSelectedDate.length} video(s) recorded`}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{eventsForSelectedDate.length === 0 ? (
							<div className="flex h-[200px] items-center justify-center rounded-md border border-gray-700 border-dashed">
								<div className="text-center">
									<h3 className="text-lg font-medium">No videos</h3>
									<p className="text-sm text-gray-400">Make sure your device working properly</p>
								</div>
							</div>
						) : (
							eventsForSelectedDate.map((event) => (
								<div key={event.id} className="rounded-lg border border-gray-700 bg-white/5 p-4">
									<h3 className="font-medium">{event.title}</h3>
									<p className="text-sm text-gray-300">{event.description}</p>
									<p className="mt-2 text-xs text-gray-400">{format(event.date, "h:mm a")}</p>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
