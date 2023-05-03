import { ContentType, ID } from "types/common";

interface Props {
  contentTypeId: ID | undefined;
  setcontentTypeId: (contentTypeId: ID) => void;
  contentTypeList: ContentType[];
  disabled?: boolean;
  onChange?: (contentType: ContentType) => void;
}

const ContentTypeSelect = ({
  contentTypeId,
  setcontentTypeId,
  contentTypeList,
  disabled,
  onChange,
}: Props) => {
  const handleContentTypeClick = (selectedContentType: ContentType) => {
    setcontentTypeId(selectedContentType.contentTypeId);
    onChange && onChange(selectedContentType);
  };

  return (
    <div>
      {contentTypeList.map((contentType) => (
        <button
          disabled={disabled}
          className={`
            m-1
            ${
              contentType.contentTypeId === contentTypeId
                ? "bg-primary text-white"
                : ""
            }
            `}
          key={contentType.contentTypeId}
          onClick={() => handleContentTypeClick(contentType)}
        >
          {contentType.contentTypeName}
        </button>
      ))}
    </div>
  );
};

export default ContentTypeSelect;
