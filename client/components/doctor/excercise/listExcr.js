import ImageDisplay from "../../imageDisplay";
import { img_base_path } from "../../../config/baseUrlConfig";
import doc from "../../../styles/modules/Doctor.module.scss";

const ListExcr = ({ dataExcrItemTemp }) => {
  const { listExcerData, toggleExcrPopup } = dataExcrItemTemp;
  return (
    <div className={doc.app_food_wrapper}>
      <h2>
        List of excercise
        <span onClick={() => toggleExcrPopup()}>Add Excercise</span>
      </h2>
      {listExcerData && (
        <div className={doc.list_cover_food}>
          {listExcerData.map(item => (
            <div className={doc.food_items} key={item.id}>
              <span>
                <ImageDisplay
                  path={`${img_base_path}${item.imageId}`}
                  width={236}
                  height={120}
                  alt={item.name}
                />
              </span>
              <h6>{item.name}</h6>
              <p>
                <span>Category: </span> {item.category.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListExcr;
