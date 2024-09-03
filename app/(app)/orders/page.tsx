"use client";

import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function Orders() {
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
			</div>

			<div
				className="flex flex-shrink justify-center rounded-lg border border-dashed shadow-sm"
				x-chunk="dashboard-02-chunk-1"
			>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Customer</TableHead>
							<TableHead className="hidden md:table-cell">Date</TableHead>
							<TableHead className="text-right">Amount</TableHead>
							<TableHead className="text-right">Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>
								<div className="font-medium">Liam Johnson</div>
							</TableCell>
							<TableCell className="hidden md:table-cell">2023-06-23</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
							<TableCell className="text-right">
								<Badge variant="destructive">Canceled</Badge>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="font-medium">Olivia Smith</div>
							</TableCell>
							<TableCell className="hidden md:table-cell">2023-06-24</TableCell>
							<TableCell className="text-right">$150.00</TableCell>
							<TableCell className="text-right">
								<Badge>Fulfilled</Badge>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="font-medium">Noah Williams</div>
							</TableCell>
							<TableCell className="hidden md:table-cell">2023-06-25</TableCell>
							<TableCell className="text-right">$350.00</TableCell>
							<TableCell className="text-right">
								<Badge>Fulfilled</Badge>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="font-medium">Emma Brown</div>
							</TableCell>
							<TableCell className="hidden md:table-cell">2023-06-26</TableCell>
							<TableCell className="text-right">$450.00</TableCell>
							<TableCell className="text-right">
								<Badge variant="destructive">Canceled</Badge>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="font-medium">Liam Johnson</div>
							</TableCell>
							<TableCell className="hidden md:table-cell">2023-06-23</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
							<TableCell className="text-right">
								<Badge variant="destructive">Canceled</Badge>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="font-medium">Liam Johnson</div>
							</TableCell>
							<TableCell className="hidden md:table-cell">2023-06-23</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
							<TableCell className="text-right">
								<Badge variant="destructive">Canceled</Badge>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="font-medium">Olivia Smith</div>
							</TableCell>
							<TableCell className="hidden md:table-cell">2023-06-24</TableCell>
							<TableCell className="text-right">$150.00</TableCell>
							<TableCell className="text-right">
								<Badge>Fulfilled</Badge>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div className="font-medium">Emma Brown</div>
							</TableCell>
							<TableCell className="hidden md:table-cell">2023-06-26</TableCell>
							<TableCell className="text-right">$450.00</TableCell>
							<TableCell className="text-right">
								<Badge>Fulfilled</Badge>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</main>
	);
}
