import { ContentType, ID } from "types/common";

interface Props {
  contentTypeId: ID | undefined;
  setcontentTypeId: (contentTypeId: ID) => void;
  contentTypeList: ContentType[];
}

const ContentTypeSelect = ({
  contentTypeId,
  setcontentTypeId,
  contentTypeList,
}: Props) => {
  const handleContentTypeClick = (selectedContentTypeId: number) => {
    setcontentTypeId(selectedContentTypeId);
  };

  return (
    <div>
      {contentTypeList.map((contentType) => (
        <button
          className={`
            m-1
            ${
              contentType.contentTypeId === contentTypeId
                ? "bg-primary text-white"
                : ""
            }
            `}
          key={contentType.contentTypeId}
          onClick={() => handleContentTypeClick(contentType.contentTypeId)}
        >
          {contentType.contentTypeName}
        </button>
      ))}
    </div>
  );
};

export default ContentTypeSelect;
