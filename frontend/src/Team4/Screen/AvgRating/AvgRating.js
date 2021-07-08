import React from 'react'

export default function AvgRating(props) {
    const { rating } = props;
    return (
        <div className="rating">
            <span>
                <i className={ rating >= 1 ? 'fa fa-star text-warning' : rating >= 0.5 ? 'fa fa-star-half-o' : 'fa fa-star-o' } ></i>
            </span> 
            <span>
                <i className={ rating >= 2 ? 'fa fa-star text-warning' : rating >= 1.5 ? 'fa fa-star-half-o' : 'fa fa-star-o' } ></i>
            </span>
            <span>
                <i className={ rating >= 3 ? 'fa fa-star text-warning' : rating >= 2.5 ? 'fa fa-star-half-o' : 'fa fa-star-o' } ></i>
            </span> 
            <span>
                <i className={ rating >= 4 ? 'fa fa-star text-warning' : rating >= 3.5 ? 'fa fa-star-half-o' : 'fa fa-star-o' } ></i>
            </span>
            <span>
                <i className={ rating >= 5 ? 'fa fa-star text-warning' : rating >= 4.5 ? 'fa fa-star-half-o' : 'fa fa-star-o' } ></i>
            </span>

        </div>
    )
}