import admin from "../../../styles/modules/Admin.module.scss";

const ListRegion = ({ listData }) => {
  return (
    <div className={admin.right_half}>
      {listData && listData.data.map(item => <p key={item.id}>{item.name}</p>)}
    </div>
  );
};

export default ListRegion;
