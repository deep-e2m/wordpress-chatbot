import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl, Button, TextControl, IconButton, ColorPalette } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
  const { testimonials, autoplay, autoplaySpeed, pauseOnHover, lazyLoad, textClampLines, backgroundColor, textColor, accentColor } = attributes;
  const [activeSlide, setActiveSlide] = useState(0);

  const updateTestimonial = (index, key, value) => {
    const updated = [...testimonials];
    updated[index][key] = value;
    setAttributes({ testimonials: updated });
  };

  const addTestimonial = () => {
    setAttributes({
      testimonials: [...testimonials, {
        id: Date.now().toString(),
        text: 'New testimonial',
        authorName: 'Author Name',
        authorRole: 'Role',
        authorCompany: 'Company',
        linkedinUrl: '',
        rating: 5,
        imageUrl: '',
        videoUrl: '',
        videoThumbnail: ''
      }]
    });
  };

  const removeTestimonial = (index) => {
    const updated = testimonials.filter((_, i) => i !== index);
    setAttributes({ testimonials: updated });
    if (activeSlide >= updated.length) setActiveSlide(Math.max(0, updated.length - 1));
  };

  const moveTestimonial = (index, direction) => {
    const updated = [...testimonials];
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < updated.length) {
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      setAttributes({ testimonials: updated });
      setActiveSlide(newIndex);
    }
  };

  const colors = [
    { name: 'White', color: '#ffffff' },
    { name: 'Light Gray', color: '#f7f7f7' },
    { name: 'Dark', color: '#333333' },
    { name: 'Blue', color: '#0073aa' },
    { name: 'Green', color: '#46b450' }
  ];

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody title={__('Carousel Settings', 'testimonial-carousel')} initialOpen={true}>
          <ToggleControl
            label={__('Autoplay', 'testimonial-carousel')}
            checked={autoplay}
            onChange={(value) => setAttributes({ autoplay: value })}
          />
          {autoplay && (
            <RangeControl
              label={__('Autoplay Speed (ms)', 'testimonial-carousel')}
              value={autoplaySpeed}
              onChange={(value) => setAttributes({ autoplaySpeed: value })}
              min={1000}
              max={10000}
              step={500}
            />
          )}
          <ToggleControl
            label={__('Pause on Hover', 'testimonial-carousel')}
            checked={pauseOnHover}
            onChange={(value) => setAttributes({ pauseOnHover: value })}
          />
          <ToggleControl
            label={__('Lazy Load Media', 'testimonial-carousel')}
            checked={lazyLoad}
            onChange={(value) => setAttributes({ lazyLoad: value })}
          />
          <RangeControl
            label={__('Text Clamp Lines', 'testimonial-carousel')}
            value={textClampLines}
            onChange={(value) => setAttributes({ textClampLines: value })}
            min={2}
            max={10}
            step={1}
          />
        </PanelBody>
        <PanelBody title={__('Colors', 'testimonial-carousel')} initialOpen={false}>
          <p><strong>{__('Background Color', 'testimonial-carousel')}</strong></p>
          <ColorPalette
            colors={colors}
            value={backgroundColor}
            onChange={(value) => setAttributes({ backgroundColor: value || '#ffffff' })}
          />
          <p><strong>{__('Text Color', 'testimonial-carousel')}</strong></p>
          <ColorPalette
            colors={colors}
            value={textColor}
            onChange={(value) => setAttributes({ textColor: value || '#333333' })}
          />
          <p><strong>{__('Accent Color', 'testimonial-carousel')}</strong></p>
          <ColorPalette
            colors={colors}
            value={accentColor}
            onChange={(value) => setAttributes({ accentColor: value || '#0073aa' })}
          />
        </PanelBody>
      </InspectorControls>

      <div className="testimonial-carousel-editor" style={{ backgroundColor, color: textColor }}>
        <div className="testimonial-controls">
          <Button isPrimary onClick={addTestimonial}>
            {__('Add Testimonial', 'testimonial-carousel')}
          </Button>
          <span className="testimonial-counter">
            {activeSlide + 1} / {testimonials.length}
          </span>
        </div>

        {testimonials.length > 0 && (
          <div className="testimonial-editor-slide">
            <div className="testimonial-slide-controls">
              <Button
                isSecondary
                onClick={() => moveTestimonial(activeSlide, -1)}
                disabled={activeSlide === 0}
              >
                {__('Move Up', 'testimonial-carousel')}
              </Button>
              <Button
                isSecondary
                onClick={() => moveTestimonial(activeSlide, 1)}
                disabled={activeSlide === testimonials.length - 1}
              >
                {__('Move Down', 'testimonial-carousel')}
              </Button>
              <Button
                isDestructive
                onClick={() => removeTestimonial(activeSlide)}
              >
                {__('Remove', 'testimonial-carousel')}
              </Button>
            </div>

            <div className="testimonial-media-section">
              <div className="media-upload-group">
                <label>{__('Author Image', 'testimonial-carousel')}</label>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => updateTestimonial(activeSlide, 'imageUrl', media.url)}
                    allowedTypes={['image']}
                    value={testimonials[activeSlide].imageUrl}
                    render={({ open }) => (
                      <div>
                        {testimonials[activeSlide].imageUrl ? (
                          <div className="media-preview">
                            <img src={testimonials[activeSlide].imageUrl} alt="" />
                            <Button isSecondary onClick={open}>{__('Change', 'testimonial-carousel')}</Button>
                            <Button isDestructive onClick={() => updateTestimonial(activeSlide, 'imageUrl', '')}>{__('Remove', 'testimonial-carousel')}</Button>
                          </div>
                        ) : (
                          <Button isPrimary onClick={open}>{__('Upload Image', 'testimonial-carousel')}</Button>
                        )}
                      </div>
                    )}
                  />
                </MediaUploadCheck>
              </div>

              <div className="media-upload-group">
                <label>{__('Video Testimonial', 'testimonial-carousel')}</label>
                <TextControl
                  placeholder="Video URL"
                  value={testimonials[activeSlide].videoUrl}
                  onChange={(value) => updateTestimonial(activeSlide, 'videoUrl', value)}
                />
                {testimonials[activeSlide].videoUrl && (
                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={(media) => updateTestimonial(activeSlide, 'videoThumbnail', media.url)}
                      allowedTypes={['image']}
                      value={testimonials[activeSlide].videoThumbnail}
                      render={({ open }) => (
                        <div>
                          {testimonials[activeSlide].videoThumbnail ? (
                            <div className="media-preview">
                              <img src={testimonials[activeSlide].videoThumbnail} alt="" />
                              <Button isSecondary onClick={open}>{__('Change Thumbnail', 'testimonial-carousel')}</Button>
                            </div>
                          ) : (
                            <Button isSecondary onClick={open}>{__('Upload Thumbnail', 'testimonial-carousel')}</Button>
                          )}
                        </div>
                      )}
                    />
                  </MediaUploadCheck>
                )}
              </div>
            </div>

            <div className="testimonial-rating">
              <label>{__('Rating', 'testimonial-carousel')}</label>
              <div className="star-selector">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => updateTestimonial(activeSlide, 'rating', star)}
                    className={star <= testimonials[activeSlide].rating ? 'active' : ''}
                    style={{ color: star <= testimonials[activeSlide].rating ? accentColor : '#ccc' }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="testimonial-text">
              <label>{__('Testimonial Text', 'testimonial-carousel')}</label>
              <RichText
                tagName="p"
                value={testimonials[activeSlide].text}
                onChange={(value) => updateTestimonial(activeSlide, 'text', value)}
                placeholder={__('Enter testimonial text...', 'testimonial-carousel')}
              />
            </div>

            <div className="testimonial-author-fields">
              <TextControl
                label={__('Author Name', 'testimonial-carousel')}
                value={testimonials[activeSlide].authorName}
                onChange={(value) => updateTestimonial(activeSlide, 'authorName', value)}
              />
              <TextControl
                label={__('Role', 'testimonial-carousel')}
                value={testimonials[activeSlide].authorRole}
                onChange={(value) => updateTestimonial(activeSlide, 'authorRole', value)}
              />
              <TextControl
                label={__('Company', 'testimonial-carousel')}
                value={testimonials[activeSlide].authorCompany}
                onChange={(value) => updateTestimonial(activeSlide, 'authorCompany', value)}
              />
              <TextControl
                label={__('LinkedIn URL', 'testimonial-carousel')}
                value={testimonials[activeSlide].linkedinUrl}
                onChange={(value) => updateTestimonial(activeSlide, 'linkedinUrl', value)}
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div className="testimonial-navigation">
              <Button
                isSecondary
                onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
                disabled={activeSlide === 0}
              >
                {__('← Previous', 'testimonial-carousel')}
              </Button>
              <Button
                isSecondary
                onClick={() => setActiveSlide(Math.min(testimonials.length - 1, activeSlide + 1))}
                disabled={activeSlide === testimonials.length - 1}
              >
                {__('Next →', 'testimonial-carousel')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}