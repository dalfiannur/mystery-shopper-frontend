import {useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card.tsx'
import {Calendar as CalendarComponent} from '@/components/ui/calendar.tsx'
import {format} from 'date-fns'

type Event = {
	id: string
	title: string
	description: string
	date: Date
}

export function HistoriesPage() {
	const [date] = useState<Date>(new Date())
	const [events] = useState<Event[]>([
		{
			id: '1',
			title: 'Family Dinner',
			description: 'Weekly family dinner at home',
			date: new Date()
		},
		{
			id: '2',
			title: 'Home Maintenance',
			description: 'Check smoke detectors and replace filters',
			date: new Date()
		},
		{
			id: '2',
			title: 'Home Maintenance',
			description: 'Check smoke detectors and replace filters',
			date: new Date()
		},
		{
			id: '2',
			title: 'Home Maintenance',
			description: 'Check smoke detectors and replace filters',
			date: new Date()
		},
		{
			id: '2',
			title: 'Home Maintenance',
			description: 'Check smoke detectors and replace filters',
			date: new Date()
		},
		{
			id: '2',
			title: 'Home Maintenance',
			description: 'Check smoke detectors and replace filters',
			date: new Date()
		}
	])
	
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
					<CardTitle>Videos for {format(date, 'MMMM d, yyyy')}</CardTitle>
					<CardDescription className="text-gray-300">
						{eventsForSelectedDate.length === 0
							? 'No videos recorded for this day'
							: `${eventsForSelectedDate.length} video(s) recorded`}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{eventsForSelectedDate.length === 0 ? (
							<div
								className="flex h-[200px] items-center justify-center rounded-md border border-gray-700 border-dashed">
								<div className="text-center">
									<h3 className="text-lg font-medium">No videos</h3>
									<p className="text-sm text-gray-400">Make sure your device working properly</p>
								</div>
							</div>
						) : (
							<div className="grid grid-cols-4 gap-4">
								{eventsForSelectedDate.map((event) => (
									<div key={event.id}
										 className="rounded-lg border border-gray-700 bg-white/5 p-4 flex gap-4">
										<img
											src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
											alt="video"
											className="rounded-md h-20 aspect-video object-cover"
										/>
										<div>
											<h3 className="font-medium">{event.title}</h3>
											<p className="text-sm text-gray-300">{event.description}</p>
											<p className="mt-2 text-xs text-gray-400">{format(event.date, 'h:mm a')}</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}