import {useState} from 'react'
import {Card} from '@/components/ui/card'
import {Camera, ChartBarIncreasing, Droplets, FileVideo, LightbulbIcon, Thermometer, Video} from 'lucide-react'
import {Area, AreaChart, CartesianGrid, XAxis} from 'recharts'
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'

const chartData = [
	{date: '2024-04-01', desktop: 222, mobile: 150},
	{date: '2024-04-02', desktop: 97, mobile: 180},
	{date: '2024-04-03', desktop: 167, mobile: 120},
	{date: '2024-04-04', desktop: 242, mobile: 260},
	{date: '2024-04-05', desktop: 373, mobile: 290},
	{date: '2024-04-06', desktop: 301, mobile: 340},
	{date: '2024-04-07', desktop: 245, mobile: 180},
	{date: '2024-04-08', desktop: 409, mobile: 320},
	{date: '2024-04-09', desktop: 59, mobile: 110},
	{date: '2024-04-10', desktop: 261, mobile: 190},
	{date: '2024-04-11', desktop: 327, mobile: 350},
	{date: '2024-04-12', desktop: 292, mobile: 210},
	{date: '2024-04-13', desktop: 342, mobile: 380},
	{date: '2024-04-14', desktop: 137, mobile: 220},
	{date: '2024-04-15', desktop: 120, mobile: 170},
	{date: '2024-04-16', desktop: 138, mobile: 190},
	{date: '2024-04-17', desktop: 446, mobile: 360},
	{date: '2024-04-18', desktop: 364, mobile: 410},
	{date: '2024-04-19', desktop: 243, mobile: 180},
	{date: '2024-04-20', desktop: 89, mobile: 150},
	{date: '2024-04-21', desktop: 137, mobile: 200},
	{date: '2024-04-22', desktop: 224, mobile: 170},
	{date: '2024-04-23', desktop: 138, mobile: 230},
	{date: '2024-04-24', desktop: 387, mobile: 290},
	{date: '2024-04-25', desktop: 215, mobile: 250},
	{date: '2024-04-26', desktop: 75, mobile: 130},
	{date: '2024-04-27', desktop: 383, mobile: 420},
	{date: '2024-04-28', desktop: 122, mobile: 180},
	{date: '2024-04-29', desktop: 315, mobile: 240},
	{date: '2024-04-30', desktop: 454, mobile: 380}
]

const chartConfig = {
	visitors: {
		label: 'Visitors'
	},
	desktop: {
		label: 'Desktop',
		color: 'var(--chart-1)'
	},
	mobile: {
		label: 'Mobile',
		color: 'var(--chart-2)'
	}
} satisfies ChartConfig

export function MainDashboard() {
	const [devices, setDevices] = useState({
		light: true,
		airConditioner: true,
		tv: false,
		router: true,
		speaker: true,
		cctv: true,
		humidifier: false
	})
	
	const [timeRange, setTimeRange] = useState('90d')
	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date)
		const referenceDate = new Date('2024-06-30')
		let daysToSubtract = 90
		if (timeRange === '30d') {
			daysToSubtract = 30
		} else if (timeRange === '7d') {
			daysToSubtract = 7
		}
		const startDate = new Date(referenceDate)
		startDate.setDate(startDate.getDate() - daysToSubtract)
		return date >= startDate
	})
	
	const toggleDevice = (device: keyof typeof devices) => {
		setDevices({
			...devices,
			[device]: !devices[device]
		})
	}
	
	return (
		<div className="grid gap-4 md:grid-cols-3">
			<div className="md:col-span-2 grid gap-4">
				<Card className="overflow-hidden border-0 bg-white/10 backdrop-blur-md text-white">
					<div className="p-6">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20">
									<ChartBarIncreasing className="h-5 w-5 text-lime-400"/>
								</div>
								<div>
									<h3 className="text-lg font-medium">Statistic of the month</h3>
								</div>
							</div>
						</div>
						
						<div className="flex items-center justify-center mb-8">
							<ChartContainer
								config={chartConfig}
								className="aspect-auto h-[380px] w-full"
							>
								<AreaChart data={filteredData}>
									<defs>
										<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
											<stop
												offset="5%"
												stopColor="var(--color-desktop)"
												stopOpacity={0.8}
											/>
											<stop
												offset="95%"
												stopColor="var(--color-desktop)"
												stopOpacity={0.1}
											/>
										</linearGradient>
										<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
											<stop
												offset="5%"
												stopColor="var(--color-mobile)"
												stopOpacity={0.8}
											/>
											<stop
												offset="95%"
												stopColor="var(--color-mobile)"
												stopOpacity={0.1}
											/>
										</linearGradient>
									</defs>
									<CartesianGrid vertical={false}/>
									<XAxis
										dataKey="date"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										minTickGap={32}
										tickFormatter={(value) => {
											const date = new Date(value)
											return date.toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric'
											})
										}}
									/>
									<ChartTooltip
										cursor={false}
										content={
											<ChartTooltipContent
												labelFormatter={(value) => {
													return new Date(value).toLocaleDateString('en-US', {
														month: 'short',
														day: 'numeric'
													})
												}}
												indicator="dot"
											/>
										}
									/>
									<Area
										dataKey="mobile"
										type="natural"
										fill="url(#fillMobile)"
										stroke="var(--color-mobile)"
										stackId="a"
									/>
									<Area
										dataKey="desktop"
										type="natural"
										fill="url(#fillDesktop)"
										stroke="var(--color-desktop)"
										stackId="a"
									/>
									<ChartLegend content={<ChartLegendContent/>}/>
								</AreaChart>
							</ChartContainer>
						</div>
					</div>
				</Card>
				
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<Card className="bg-white/10 backdrop-blur-md border-0 p-4 text-white">
						<div className="flex flex-col items-center gap-2">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20">
								<Video className="h-5 w-5 text-lime-400"/>
							</div>
							<h3 className="text-sm font-medium">Total Videos</h3>
							<p className="text-2xl font-bold">1.1K</p>
						</div>
					</Card>
					
					<Card className="bg-white/10 backdrop-blur-md border-0 p-4 text-white">
						<div className="flex flex-col items-center gap-2">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20">
								<Camera className="h-5 w-5 text-lime-400"/>
							</div>
							<h3 className="text-sm font-medium">Total Devices</h3>
							<p className="text-2xl font-bold">50</p>
						</div>
					</Card>
					
					<Card className="bg-white/10 backdrop-blur-md border-0 p-4 text-white">
						<div className="flex flex-col items-center gap-2">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20">
								<Thermometer className="h-5 w-5 text-lime-400"/>
							</div>
							<h3 className="text-sm font-medium">Temperature</h3>
							<p className="text-2xl font-bold">16 °C</p>
						</div>
					</Card>
					
					<Card className="bg-white/10 backdrop-blur-md border-0 p-4 text-white">
						<div className="flex flex-col items-center gap-2">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20">
								<LightbulbIcon className="h-5 w-5 text-lime-400"/>
							</div>
							<h3 className="text-sm font-medium">Energy Usage</h3>
							<p className="text-2xl font-bold">2.2 K</p>
						</div>
					</Card>
				</div>
			</div>
			
			<div className="grid gap-4 content-start">
				<Card className="bg-white/10 backdrop-blur-md border-0 overflow-hidden text-white p-4">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-sm font-medium">Camera</h3>
						<div className="flex items-center">
							<div className="h-3 w-3 rounded-full bg-lime-400 mr-2"></div>
							<span className="text-xs">Agent 1</span>
						</div>
					</div>
					<div>
						<div className="relative rounded-lg overflow-hidden">
							<video
								src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
								controls
								autoPlay
								className="w-full aspect-video object-cover rounded-lg"
							/>
							<div
								className="absolute top-2 left-2 bg-red-500/80 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
								Live
							</div>
						</div>
					</div>
				</Card>
				
				<Card className="bg-white/10 backdrop-blur-md border-0 p-4 text-white">
					<div className="mb-4 flex justify-between items-center">
						<h3 className="text-lg font-medium">Last Videos</h3>
						<a href="#" className="text-xs font-medium">View All</a>
					</div>
					
					<div className="grid grid-cols-2 gap-4">
						
						{Array.from({length: 6}).map((_, index) => (
							<div
								key={index}
								data-active={index !== 0}
								className="flex items-center justify-between p-3 rounded-lg data-[active=true]:bg-lime-400/20 data-[active=false]:bg-white/5"
							>
								<div className="flex items-center gap-2">
									<div
										className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.light ? 'bg-lime-400' : 'bg-white/10'}`}
									>
										<FileVideo
											className={`h-4 w-4 ${devices.light ? 'text-black' : 'text-white'}`}/>
									</div>
									<div>
										<div className="text-xs font-bold">Agent 1</div>
										<div className="text-xs font-thin">20 Aug 2025, 13:40 WIB</div>
									</div>
								</div>
								{index !== 0 && (
									<span className="text-xs font-thin">Unwatched</span>
								)}
							</div>
						))}
					
					</div>
				</Card>
			</div>
		</div>
	)
}
