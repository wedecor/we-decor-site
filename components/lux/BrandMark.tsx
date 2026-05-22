import LogoNavbar from '@/components/lux/LogoNavbar';
import BrandWordmark from '@/components/lux/BrandWordmark';

type BrandMarkProps = {
  variant?: 'nav' | 'footer' | 'primary';
  asLink?: boolean;
};

/** Brand lockup router — typography only */
export default function BrandMark({ variant = 'nav', asLink = true }: BrandMarkProps) {
  if (variant === 'nav') {
    return <LogoNavbar asLink={asLink} />;
  }

  return (
    <BrandWordmark
      asLink={asLink}
      showTagline={variant !== 'footer'}
      compact={variant === 'footer'}
    />
  );
}
