import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { columns, highlightedColumn, backgroundColor, highlightColor, buttonColor, buttonTextColor } = attributes;

  return (
    <div {...useBlockProps.save()}>
      <div className="pricing-table-container">
        {columns.map((column, index) => (
          <div
            key={index}
            className={`pricing-column ${index === highlightedColumn ? 'highlighted' : ''}`}
            style={{
              backgroundColor: index === highlightedColumn ? highlightColor : backgroundColor,
              borderColor: index === highlightedColumn ? highlightColor : '#ddd'
            }}
          >
            {index === highlightedColumn && (
              <div className="recommended-badge">Recommended</div>
            )}
            <RichText.Content
              tagName="h3"
              value={column.title}
              className="pricing-title"
            />
            <RichText.Content
              tagName="p"
              value={column.description}
              className="pricing-description"
            />
            <div className="pricing-price">
              <RichText.Content
                tagName="div"
                value={column.price}
                className="price-amount"
              />
              <RichText.Content
                tagName="div"
                value={column.priceSubtext}
                className="price-subtext"
              />
            </div>
            <ul className="pricing-features">
              {column.features.map((feature, featIndex) => (
                <li key={featIndex} className="feature-item">
                  <span className="feature-checkmark">✓</span>
                  <RichText.Content tagName="span" value={feature} />
                </li>
              ))}
            </ul>
            <a
              href={column.buttonUrl}
              className="pricing-button"
              style={{
                backgroundColor: buttonColor,
                color: buttonTextColor
              }}
            >
              <RichText.Content tagName="span" value={column.buttonText} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}