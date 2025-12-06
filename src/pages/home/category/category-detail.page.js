import { useParams, useSearchParams } from "react-router-dom";

const CategoryDetail = () => {
  let param = useParams();
  let [query, setQuery] = useSearchParams();
  return <>Category: {param.id}</>;
};
export default CategoryDetail;
