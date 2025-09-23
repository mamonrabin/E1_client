import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PurchasedDay = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] rounded-[1px] border border-primary/40 outline-none">
        <SelectValue placeholder="Last 7 Days" />
      </SelectTrigger>
      <SelectContent className="rounded-[1px] border border-primary/40 z-50 bg-white">
        <SelectItem value="a-z">Last 7 Days</SelectItem>
        <SelectItem value="z-a">Last 15 Days</SelectItem>
        <SelectItem value="low-high">Last 30 Days</SelectItem>
        <SelectItem value="high-low">All</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default PurchasedDay;
