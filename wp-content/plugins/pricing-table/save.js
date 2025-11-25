import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    plan1Title, plan1Description, plan1Price, plan1Features, plan1ButtonText, plan1ButtonUrl,
    plan2Title, plan2Description, plan2Price, plan2Features, plan2ButtonText, plan2ButtonUrl,
    plan3Title, plan3Description, plan3Price, plan3Features, plan3ButtonText, plan3ButtonUrl,
    featuredBgColor, featuredTextColor, normalBgColor, normalTextColor, buttonColor, buttonTextColor
  } = attributes;

  return (
    <div {...useBlockProps.save()}>
      <div className="pricing-table">
        <div className="pricing-column" style={{ backgroundColor: normalBgColor, color: normalTextColor }}>
          <RichText.Content tagName="h3" className="pricing-title" value={plan1Title} />
          <RichText.Content tagName="p" className="pricing-description" value={plan1Description} />
          <RichText.Content tagName="div" className="pricing-price" value={plan1Price} />
          <RichText.Content tagName="div" className="pricing-features" value={plan1Features} />
          {plan1ButtonUrl ? (
            <a href={plan1ButtonUrl} className="pricing-button" style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
              <RichText.Content tagName="span" value={plan1ButtonText} />
            </a>
          ) : (
            <span className="pricing-button" style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
              <RichText.Content tagName="span" value={plan1ButtonText} />
            </span>
          )}
        </div>

        <div className="pricing-column pricing-featured" style={{ backgroundColor: featuredBgColor, color: featuredTextColor }}>
          <div className="featured-badge">Recommended</div>
          <RichText.Content tagName="h3" className="pricing-title" value={plan2Title} />
          <RichText.Content tagName="p" className="pricing-description" value={plan2Description} />
          <RichText.Content tagName="div" className="pricing-price" value={plan2Price} />
          <RichText.Content tagName="div" className="pricing-features" value={plan2Features} />
          {plan2ButtonUrl ? (
            <a href={plan2ButtonUrl} className="pricing-button pricing-button-featured" style={{ backgroundColor: buttonTextColor, color: buttonColor }}>
              <RichText.Content tagName="span" value={plan2ButtonText} />
            </a>
          ) : (
            <span className="pricing-button pricing-button-featured" style={{ backgroundColor: buttonTextColor, color: buttonColor }}>
              <RichText.Content tagName="span" value={plan2ButtonText} />
            </span>
          )}
        </div>

        <div className="pricing-column" style={{ backgroundColor: normalBgColor, color: normalTextColor }}>
          <RichText.Content tagName="h3" className="pricing-title" value={plan3Title} />
          <RichText.Content tagName="p" className="pricing-description" value={plan3Description} />
          <RichText.Content tagName="div" className="pricing-price" value={plan3Price} />
          <RichText.Content tagName="div" className="pricing-features" value={plan3Features} />
          {plan3ButtonUrl ? (
            <a href={plan3ButtonUrl} className="pricing-button" style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
              <RichText.Content tagName="span" value={plan3ButtonText} />
            </a>
          ) : (
            <span className="pricing-button" style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
              <RichText.Content tagName="span" value={plan3ButtonText} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}