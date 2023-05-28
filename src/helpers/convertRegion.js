import { useSelector } from "react-redux";

export default function convertRegion(id) {
  const data = useSelector((state) => state);
  const regions = data.applicant.regions;
  if (regions.length == 0 || id == "" || undefined) {
    return "";
  }
  const name = regions[Number(id) - 1].name;

  return name;
}
