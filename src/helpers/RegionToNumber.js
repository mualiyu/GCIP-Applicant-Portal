import { useSelector } from "react-redux";

export default function RegionToNumber(name) {
  const data = useSelector((state) => state);
  const regions = data.applicant.regions;
  if (regions.length == 0 || name == "" || undefined) {
    return "";
  }
  //   const name = regions;

  return regions;
}
