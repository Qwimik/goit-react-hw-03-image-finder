import ImageGalleryItem from 'components/ImageGalleryItem';
import { RotatingLines } from 'react-loader-spinner';

const ImageGallery = ({ items, searchValue, status }) => {
  //'idle'
  if (status === 'idle') {
    return <p className="start-text">Please enter your request :)</p>;
  }

  //'rejected'
  if (status === 'rejected') {
    return (
      <p className="start-text">
        Sorry, no result at your request "{searchValue}" :(
      </p>
    );
  }

  //'resolved'
  return (
    <>
      <ul className="ImageGallery">
        {items.map(item => (
          <ImageGalleryItem item={item} key={item.id} />
        ))}
      </ul>
      {status === 'pending' && (
        <div className="loading">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="3"
            animationDuration="0.75"
            width="36"
            visible={true}
          />
        </div>
      )}
    </>
  );
};

export default ImageGallery;
