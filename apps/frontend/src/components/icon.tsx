import { useTheme } from '@ketero/hooks';
import { cn } from '@ketero/utils';

type Props = {
  size?: number;
  className?: string;
};

export const Icon = ({ size = 32, className }: Props) => {
  const { isDarkMode } = useTheme();

  let src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  switch (isDarkMode) {
    case false: {
      // src = "/icon/dark.svg";
      src = '/icon/light.svg';

      break;
    }
    case true: {
      src = '/icon/light.svg';
      break;
    }
  }

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="Reactive Resume"
      className={cn('rounded-sm', className)}
    />
  );
};
