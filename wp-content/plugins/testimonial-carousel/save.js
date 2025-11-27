import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { testimonials, autoplay, autoplaySpeed, pauseOnHover, lazyLoad, textClampLines, backgroundColor, textColor, accentColor } = attributes;

  return (
    <div {...useBlockProps.save()} 
      data-autoplay={autoplay}
      data-autoplay-speed={autoplaySpeed}
      data-pause-on-hover={pauseOnHover}
      data-text-clamp={textClampLines}
      style={{ backgroundColor }}
    >
      <div className="testimonial-carousel-container">
        <div className="testimonial-carousel-track" role="region" aria-label="Testimonial carousel" aria-live="polite">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="testimonial-slide"
              data-slide-index={index}
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="testimonial-content" style={{ backgroundColor, color: textColor }}>
                {testimonial.videoUrl && (
                  <button 
                    className="testimonial-video-trigger"
                    data-video-url={testimonial.videoUrl}
                    aria-label="Play video testimonial"
                  >
                    <div className="video-thumbnail">
                      {testimonial.videoThumbnail && (
                        <img 
                          src={testimonial.videoThumbnail} 
                          alt="Video thumbnail"
                          loading={lazyLoad ? 'lazy' : 'eager'}
                        />
                      )}
                      <span className="play-icon" aria-hidden="true">▶</span>
                    </div>
                  </button>
                )}

                <div className="testimonial-rating" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  <div className="stars" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={i < testimonial.rating ? 'star filled' : 'star'}
                        style={{ color: i < testimonial.rating ? accentColor : '#ddd' }}
                        aria-hidden="true"
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <meta itemProp="ratingValue" content={testimonial.rating} />
                  <meta itemProp="bestRating" content="5" />
                </div>

                <div className="testimonial-text-wrapper">
                  <RichText.Content 
                    tagName="p" 
                    value={testimonial.text}
                    className="testimonial-text clamped"
                    itemProp="reviewBody"
                    style={{ WebkitLineClamp: textClampLines }}
                  />
                  <button className="read-more-btn" style={{ color: accentColor }} aria-label="Read more">
                    Read more
                  </button>
                </div>

                <div className="testimonial-author" itemProp="author" itemScope itemType="https://schema.org/Person">
                  {testimonial.imageUrl && (
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.authorName}
                      className="author-image"
                      loading={lazyLoad ? 'lazy' : 'eager'}
                    />
                  )}
                  <div className="author-info">
                    <div className="author-name" itemProp="name">
                      {testimonial.linkedinUrl ? (
                        <a href={testimonial.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }}>
                          {testimonial.authorName}
                        </a>
                      ) : (
                        testimonial.authorName
                      )}
                    </div>
                    <div className="author-meta">
                      <span className="author-role" itemProp="jobTitle">{testimonial.authorRole}</span>
                      {testimonial.authorCompany && (
                        <span className="author-company" itemProp="worksFor">{testimonial.authorCompany}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn prev" aria-label="Previous testimonial" style={{ color: accentColor }}>
          <span aria-hidden="true">‹</span>
        </button>
        <button className="carousel-btn next" aria-label="Next testimonial" style={{ color: accentColor }}>
          <span aria-hidden="true">›</span>
        </button>

        <div className="carousel-dots" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              className="dot"
              role="tab"
              aria-label={`Go to testimonial ${index + 1}`}
              aria-selected={index === 0 ? 'true' : 'false'}
              data-slide={index}
              style={{ backgroundColor: index === 0 ? accentColor : '#ccc' }}
            />
          ))}
        </div>
      </div>

      <div className="testimonial-lightbox" role="dialog" aria-modal="true" aria-label="Video testimonial" style={{ display: 'none' }}>
        <button className="lightbox-close" aria-label="Close video">×</button>
        <div className="lightbox-content">
          <div className="video-wrapper"></div>
        </div>
      </div>
    </div>
  );
}