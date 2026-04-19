import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);  