import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortShop = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] rounded-sm border border-primary/40 outline-none">
        <SelectValue placeholder="Default sorting" />
      </SelectTrigger>
      <SelectContent className="rounded-sm border border-primary/40 z-50 bg-white">
        <SelectItem value="a-z"> Sorting by A to Z</SelectItem>
        <SelectItem value="z-a">Sorting by Z to A</SelectItem>
        <SelectItem value="low-high">Price, low to high</SelectItem>
        <SelectItem value="high-low">Price, high to low</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortShop;
