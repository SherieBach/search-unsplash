import React from "react";
import '../styles/index.css'

/**
 * Displaying a grid of images from an array via properties.
 */
//TODO: * Onclick function to enlarge images in e.g. modal.
    //TODO: * Change style of grids in e.g. mosaic/collage.


const ImageGrid = (props) => {

    return (
        <>
            <main>
                <div className="card-image-gallery">
                    {props.value.map(image =>
                        <div key={image.id}
                             className="card">
                            <img
                                className="card-image"
                                alt={image.description}
                                src={image.url}
                            />
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default ImageGrid;
