import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, RangeControl, TextControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { columns, highlightedColumn, backgroundColor, highlightColor, buttonColor, buttonTextColor } = attributes;

  const updateColumn = (index, field, value) => {
    const newColumns = [...columns];
    newColumns[index][field] = value;
    setAttributes({ columns: newColumns });
  };

  const updateFeature = (colIndex, featIndex, value) => {
    const newColumns = [...columns];
    newColumns[colIndex].features[featIndex] = value;
    setAttributes({ columns: newColumns });
  };

  const addFeature = (colIndex) => {
    const newColumns = [...columns];
    newColumns[colIndex].features.push('New feature');
    setAttributes({ columns: newColumns });
  };

  const removeFeature = (colIndex, featIndex) => {
    const newColumns = [...columns];
    newColumns[colIndex].features.splice(featIndex, 1);
    setAttributes({ columns: newColumns });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Pricing Table Settings', 'pricing-table')}>
          <RangeControl
            label={__('Highlighted Column', 'pricing-table')}
            value={highlightedColumn}
            onChange={(value) => setAttributes({ highlightedColumn: value })}
            min={0}
            max={2}
          />
        </PanelBody>
        <PanelBody title={__('Colors', 'pricing-table')} initialOpen={false}>
          <p><strong>{__('Background Color', 'pricing-table')}</strong></p>
          <ColorPicker
            color={backgroundColor}
            onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
          />
          <p><strong>{__('Highlight Color', 'pricing-table')}</strong></p>
          <ColorPicker
            color={highlightColor}
            onChangeComplete={(value) => setAttributes({ highlightColor: value.hex })}
          />
          <p><strong>{__('Button Color', 'pricing-table')}</strong></p>
          <ColorPicker
            color={buttonColor}
            onChangeComplete={(value) => setAttributes({ buttonColor: value.hex })}
          />
          <p><strong>{__('Button Text Color', 'pricing-table')}</strong></p>
          <ColorPicker
            color={buttonTextColor}
            onChangeComplete={(value) => setAttributes({ buttonTextColor: value.hex })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...useBlockProps()}>
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
                <div className="recommended-badge">{__('Recommended', 'pricing-table')}</div>
              )}
              <RichText
                tagName="h3"
                value={column.title}
                onChange={(value) => updateColumn(index, 'title', value)}
                placeholder={__('Plan Title', 'pricing-table')}
                className="pricing-title"
              />
              <RichText
                tagName="p"
                value={column.description}
                onChange={(value) => updateColumn(index, 'description', value)}
                placeholder={__('Plan Description', 'pricing-table')}
                className="pricing-description"
              />
              <div className="pricing-price">
                <RichText
                  tagName="div"
                  value={column.price}
                  onChange={(value) => updateColumn(index, 'price', value)}
                  placeholder={__('$29', 'pricing-table')}
                  className="price-amount"
                />
                <RichText
                  tagName="div"
                  value={column.priceSubtext}
                  onChange={(value) => updateColumn(index, 'priceSubtext', value)}
                  placeholder={__('per month', 'pricing-table')}
                  className="price-subtext"
                />
              </div>
              <ul className="pricing-features">
                {column.features.map((feature, featIndex) => (
                  <li key={featIndex} className="feature-item">
                    <RichText
                      tagName="span"
                      value={feature}
                      onChange={(value) => updateFeature(index, featIndex, value)}
                      placeholder={__('Feature', 'pricing-table')}
                    />
                    <Button
                      isDestructive
                      isSmall
                      onClick={() => removeFeature(index, featIndex)}
                      className="remove-feature"
                    >
                      ×
                    </Button>
                  </li>
                ))}
              </ul>
              <Button
                isSecondary
                isSmall
                onClick={() => addFeature(index)}
                className="add-feature-btn"
              >
                {__('+ Add Feature', 'pricing-table')}
              </Button>
              <div className="pricing-button-wrapper">
                <TextControl
                  value={column.buttonUrl}
                  onChange={(value) => updateColumn(index, 'buttonUrl', value)}
                  placeholder={__('Button URL', 'pricing-table')}
                  className="button-url-input"
                />
                <RichText
                  tagName="div"
                  value={column.buttonText}
                  onChange={(value) => updateColumn(index, 'buttonText', value)}
                  placeholder={__('Get Started', 'pricing-table')}
                  className="pricing-button"
                  style={{
                    backgroundColor: buttonColor,
                    color: buttonTextColor
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}