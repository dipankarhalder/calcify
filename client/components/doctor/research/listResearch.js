import moment from "moment";
import Link from "next/link";
import { HiPlusSm } from "react-icons/hi";
import ImageDisplay from "@/imageDisplay";
import { img_base_path } from "@/baseUrlConfig";
import doct from "@/Doctor.module.scss";

const ListResearch = ({
  listData,
  toggleResearchPopup,
  toggleOpenAddBlogPop,
}) => {
  return (
    <div className={doct.research_wrapper}>
      {listData &&
        [...listData.data].reverse().map(item => (
          <div key={item.id} className={doct.list_page_blog}>
            <div className={doct.avatarInfo}>
              {item.creator.imageId !== null ? (
                <span>
                  <ImageDisplay
                    path={`${img_base_path}${item.creator.imageId}`}
                    width={50}
                    height={50}
                    alt={item.creator.firstName}
                  />
                </span>
              ) : (
                <span>No Image</span>
              )}
              <p className={doct.drname}>
                Dr. {item.creator.firstName} {item.creator.lastName}
              </p>
              <p className={doct.datarel}>
                {moment(item.publishedAt).format("LL")}
              </p>
            </div>
            <span>
              <ImageDisplay
                path={`${img_base_path}${item.files[0]}`}
                width={768}
                height={280}
                alt={item.creator.firstName}
              />
            </span>
            <h4>{item.title}</h4>
            <div
              className={doct.content_item}
              dangerouslySetInnerHTML={{
                __html: `${item.content.slice(0, 400)}...`,
              }}
            />
            {item.content.length > 80 && (
              <div className={doct.likeCommetSec}>
                <Link href={`/doctor/research/${item.id}`}>
                  <a className={doct.rightLink}>more details...</a>
                </Link>
              </div>
            )}
          </div>
        ))}
      <div className={doct.posAbsoluteBtn}>
        <span
          className={doct.addNewArticles}
          onClick={() => toggleResearchPopup()}
        >
          <HiPlusSm /> Add New Article
        </span>
        <span
          className={doct.addNewBlog}
          onClick={() => toggleOpenAddBlogPop()}
        >
          <HiPlusSm /> Add New Blog
        </span>
      </div>
    </div>
  );
};

export default ListResearch;
