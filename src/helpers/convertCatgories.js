import { useSelector } from "react-redux";

export default function convertCategories(id) {
  const data = useSelector((state) => state);
  const categories = data.applicant.categories;
  if (categories.length == 0 || id == "" || undefined) {
    return "";
  }
  const name = categories[Number(id) - 1].name;

  return name;
}