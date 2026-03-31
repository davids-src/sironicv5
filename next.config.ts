import createProxy from "next-intl/plugin";

const withNextIntl = createProxy("./i18n/request.ts");

const nextConfig = {
  images: {
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
