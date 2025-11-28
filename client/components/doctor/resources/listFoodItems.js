import ImageDisplay from "@/imageDisplay";
import { img_base_path } from "@/baseUrlConfig";
import doc from "@/Doctor.module.scss";

const ListFoodItems = ({ listFoodProps }) => {
  const { toggleFoodItemPopup, listFoodData } = listFoodProps;
  return (
    <div className={doc.app_food_wrapper}>
      <h2>
        List of food items
        <span onClick={() => toggleFoodItemPopup()}>Add Food Item</span>
      </h2>
      {listFoodData && (
        <div className={doc.list_cover_food}>
          {listFoodData.map(item => (
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

export default ListFoodItems;
