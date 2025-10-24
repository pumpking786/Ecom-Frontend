import { useParams, useSearchParams } from "react-router-dom";
import { HeaderComponent } from "../../../components/home/header.component";

const CategoryDetail = () => {
  let param = useParams();
  let [query, setQuery] = useSearchParams();
  return <>Category: {param.id}</>;
};
export default CategoryDetail;
