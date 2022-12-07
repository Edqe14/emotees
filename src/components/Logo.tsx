import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/">
      <svg
        width="182"
        height="35"
        viewBox="0 0 182 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21.816 27.04C21.976 27.008 22.184 26.992 22.44 26.992C23.4 26.992 24.152 27.28 24.696 27.856C25.24 28.4 25.512 29.152 25.512 30.112C25.512 31.776 24.648 32.784 22.92 33.136C21.48 33.424 18.792 33.568 14.856 33.568H13.32C11.56 33.568 9.88 33.52 8.28 33.424C6.712 33.328 4.776 33.136 2.472 32.848C1.064 32.656 0.36 31.696 0.36 29.968C0.36 29.136 0.52 28.448 0.84 27.904C1.16 27.328 1.656 27.008 2.328 26.944H2.808C3.192 24.352 3.352 21.856 3.288 19.456H2.952C2.184 19.456 1.608 19.2 1.224 18.688C0.872 18.144 0.696 17.344 0.696 16.288C0.696 15.392 0.872 14.656 1.224 14.08C1.608 13.504 2.168 13.216 2.904 13.216H3.288C3.32 12.032 3.336 9.776 3.336 6.448C2.248 6 1.704 5.088 1.704 3.712C1.704 2.688 1.976 1.952 2.52 1.504C3.064 1.024 3.912 0.719998 5.064 0.591998C6.632 0.431998 9.48 0.351998 13.608 0.351998C17.608 0.351998 20.664 0.479999 22.776 0.735999C23.736 0.831998 24.472 1.12 24.984 1.6C25.528 2.048 25.8 2.752 25.8 3.712C25.8 4.672 25.56 5.456 25.08 6.064C24.6 6.64 23.944 6.896 23.112 6.832C20.168 6.576 17.576 6.448 15.336 6.448C14.312 6.448 13 6.48 11.4 6.544L10.152 6.592L10.296 13.312H11.4C13 13.312 14.952 13.344 17.256 13.408L20.328 13.504C21.576 13.504 22.2 14.512 22.2 16.528C22.2 17.488 22.008 18.24 21.624 18.784C21.272 19.328 20.76 19.6 20.088 19.6C19.128 19.6 18.312 19.584 17.64 19.552L11.4 19.504H10.344C10.28 22.384 10.088 24.976 9.768 27.28C10.984 27.408 12.504 27.472 14.328 27.472C16.984 27.472 19.48 27.328 21.816 27.04ZM52.2311 9.856C55.3031 9.856 57.5271 10.944 58.9031 13.12C60.3111 15.264 61.0151 18.224 61.0151 22C61.0151 23.856 60.9991 25.232 60.9671 26.128L60.9191 31.456C60.9191 32.224 60.6311 32.848 60.0551 33.328C59.4791 33.776 58.7111 34 57.7511 34C56.7591 34 55.9271 33.76 55.2551 33.28C54.6151 32.8 54.2951 32.128 54.2951 31.264V22C54.2951 19.44 54.0711 17.616 53.6231 16.528C53.2071 15.44 52.5191 14.896 51.5591 14.896C50.8551 14.896 50.2311 15.472 49.6871 16.624C49.1751 17.744 48.9031 19.408 48.8711 21.616V24.88V31.264C48.8711 33.024 47.7991 33.904 45.6551 33.904C44.5351 33.904 43.6711 33.68 43.0631 33.232C42.4551 32.752 42.1511 32.08 42.1511 31.216L42.1991 21.616C42.1991 19.376 41.9591 17.744 41.4791 16.72C41.0311 15.664 40.3271 15.136 39.3671 15.136C38.7591 15.136 38.1351 15.568 37.4951 16.432C36.8871 17.264 36.4071 18.496 36.0551 20.128C35.8311 21.056 35.7191 22.256 35.7191 23.728L35.7671 28.096V31.696C35.7671 32.4 35.4471 32.96 34.8071 33.376C34.1671 33.76 33.3991 33.952 32.5031 33.952C31.6071 33.952 30.8391 33.76 30.1991 33.376C29.5591 32.96 29.2391 32.384 29.2391 31.648V17.056C29.2391 16.32 29.1911 15.776 29.0951 15.424C28.9991 15.072 28.7911 14.736 28.4711 14.416C28.4391 14.384 28.3431 14.288 28.1831 14.128C28.0231 13.968 27.8951 13.808 27.7991 13.648C27.7351 13.488 27.7031 13.312 27.7031 13.12C27.7031 12.288 28.0071 11.616 28.6151 11.104C29.2551 10.56 29.9591 10.288 30.7271 10.288C31.3671 10.288 32.0711 10.768 32.8391 11.728C33.3831 12.432 33.6551 13.136 33.6551 13.84V14.128C34.1671 12.944 34.9191 11.968 35.9111 11.2C36.9351 10.4 38.2151 10 39.7511 10C41.2871 10 42.4871 10.32 43.3511 10.96C44.2471 11.568 44.9351 12.432 45.4151 13.552C46.1191 12.368 47.0471 11.456 48.1991 10.816C49.3831 10.176 50.7271 9.856 52.2311 9.856ZM75.7005 34.144C71.6365 34.144 68.4045 33.088 66.0045 30.976C63.6365 28.832 62.4525 25.84 62.4525 22C62.4525 19.504 62.9805 17.28 64.0365 15.328C65.0925 13.376 66.5805 11.856 68.5005 10.768C70.4525 9.68 72.7405 9.136 75.3645 9.136C78.0205 9.136 80.3565 9.696 82.3725 10.816C84.3885 11.936 85.9405 13.504 87.0285 15.52C88.1485 17.504 88.7085 19.776 88.7085 22.336C88.7085 26.08 87.5405 28.992 85.2045 31.072C82.8685 33.12 79.7005 34.144 75.7005 34.144ZM75.6045 28.816C77.5565 28.816 79.0605 28.272 80.1165 27.184C81.2045 26.064 81.7485 24.416 81.7485 22.24C81.7485 20.096 81.2205 18.272 80.1645 16.768C79.1405 15.232 77.6205 14.464 75.6045 14.464C73.7165 14.464 72.2125 15.152 71.0925 16.528C69.9725 17.904 69.4125 19.744 69.4125 22.048C69.4125 24.288 69.9565 25.984 71.0445 27.136C72.1325 28.256 73.6525 28.816 75.6045 28.816ZM104.617 24.448C105.673 24.448 106.441 24.656 106.921 25.072C107.401 25.488 107.641 26.16 107.641 27.088C107.641 29.2 106.969 30.896 105.625 32.176C104.281 33.456 102.585 34.096 100.537 34.096C97.7528 34.096 95.7208 32.976 94.4408 30.736C93.1608 28.464 92.5208 24.88 92.5208 19.984C92.5208 18.512 92.5368 17.44 92.5688 16.768C92.3448 16.736 91.9768 16.72 91.4648 16.72C89.6408 16.688 88.7288 15.808 88.7288 14.08C88.7288 13.184 88.9528 12.512 89.4008 12.064C89.8808 11.616 90.7128 11.408 91.8968 11.44L92.9528 11.488C93.1768 9.504 93.5448 7.072 94.0568 4.192C94.1848 3.424 94.5368 2.848 95.1128 2.464C95.7208 2.048 96.4888 1.84 97.4168 1.84C98.5048 1.84 99.3528 2.096 99.9608 2.608C100.569 3.12 100.873 3.744 100.873 4.48L100.825 4.864L100.585 6.4C100.201 9.024 99.9448 10.816 99.8168 11.776C100.905 11.84 101.737 11.872 102.313 11.872C103.945 11.904 104.761 12.752 104.761 14.416C104.761 15.248 104.537 15.872 104.089 16.288C103.641 16.704 102.889 16.912 101.833 16.912H99.4328C99.4008 17.552 99.3848 18.576 99.3848 19.984C99.3848 22.352 99.4328 24.176 99.5288 25.456C99.6568 26.704 99.8328 27.552 100.057 28C100.281 28.448 100.569 28.672 100.921 28.672C101.369 28.672 101.657 28.528 101.785 28.24C101.913 27.952 101.977 27.44 101.977 26.704C101.977 25.2 102.857 24.448 104.617 24.448ZM121.961 34.48C119.049 34.48 116.585 33.936 114.569 32.848C112.585 31.76 111.097 30.256 110.105 28.336C109.113 26.416 108.617 24.24 108.617 21.808C108.617 19.376 109.177 17.216 110.297 15.328C111.449 13.408 113.001 11.92 114.953 10.864C116.937 9.808 119.145 9.28 121.577 9.28C123.753 9.28 125.737 9.712 127.529 10.576C129.353 11.44 130.777 12.688 131.801 14.32C132.857 15.92 133.385 17.808 133.385 19.984C133.385 21.36 133.129 22.352 132.617 22.96C132.137 23.536 131.305 23.824 130.121 23.824H114.617C114.617 24.592 114.889 25.376 115.433 26.176C115.977 26.944 116.793 27.6 117.881 28.144C118.969 28.688 120.265 28.96 121.769 28.96C123.113 28.96 124.169 28.768 124.937 28.384C125.705 27.968 126.505 27.36 127.337 26.56C127.945 26.016 128.569 25.744 129.209 25.744C129.945 25.744 130.633 26.032 131.273 26.608C131.913 27.152 132.233 27.776 132.233 28.48C132.233 29.056 132.041 29.616 131.657 30.16C130.985 31.216 129.849 32.208 128.249 33.136C126.649 34.032 124.553 34.48 121.961 34.48ZM127.049 19.504C127.337 19.504 127.513 19.456 127.577 19.36C127.673 19.264 127.721 19.088 127.721 18.832C127.721 17.584 127.113 16.544 125.897 15.712C124.713 14.88 123.241 14.464 121.481 14.464C120.073 14.464 118.841 14.736 117.785 15.28C116.761 15.824 115.977 16.496 115.433 17.296C114.889 18.064 114.617 18.8 114.617 19.504H127.049ZM148.155 34.48C145.243 34.48 142.779 33.936 140.763 32.848C138.779 31.76 137.291 30.256 136.299 28.336C135.307 26.416 134.811 24.24 134.811 21.808C134.811 19.376 135.371 17.216 136.491 15.328C137.643 13.408 139.195 11.92 141.147 10.864C143.131 9.808 145.339 9.28 147.771 9.28C149.947 9.28 151.931 9.712 153.723 10.576C155.547 11.44 156.971 12.688 157.995 14.32C159.051 15.92 159.579 17.808 159.579 19.984C159.579 21.36 159.323 22.352 158.811 22.96C158.331 23.536 157.499 23.824 156.315 23.824H140.811C140.811 24.592 141.083 25.376 141.627 26.176C142.171 26.944 142.987 27.6 144.075 28.144C145.163 28.688 146.459 28.96 147.963 28.96C149.307 28.96 150.363 28.768 151.131 28.384C151.899 27.968 152.699 27.36 153.531 26.56C154.139 26.016 154.763 25.744 155.403 25.744C156.139 25.744 156.827 26.032 157.467 26.608C158.107 27.152 158.427 27.776 158.427 28.48C158.427 29.056 158.235 29.616 157.851 30.16C157.179 31.216 156.043 32.208 154.443 33.136C152.843 34.032 150.747 34.48 148.155 34.48ZM153.243 19.504C153.531 19.504 153.707 19.456 153.771 19.36C153.867 19.264 153.915 19.088 153.915 18.832C153.915 17.584 153.307 16.544 152.091 15.712C150.907 14.88 149.435 14.464 147.675 14.464C146.267 14.464 145.035 14.736 143.979 15.28C142.955 15.824 142.171 16.496 141.627 17.296C141.083 18.064 140.811 18.8 140.811 19.504H153.243ZM171.132 34.432C168.924 34.432 166.956 33.92 165.228 32.896C163.5 31.84 162.268 30.448 161.532 28.72C161.34 28.24 161.244 27.84 161.244 27.52C161.244 26.848 161.596 26.208 162.3 25.6C163.004 24.992 163.772 24.688 164.604 24.688C165.084 24.688 165.468 24.8 165.756 25.024C166.044 25.216 166.268 25.408 166.428 25.6C166.588 25.76 166.684 25.872 166.716 25.936C167.644 27.024 168.412 27.792 169.02 28.24C169.628 28.688 170.364 28.912 171.228 28.912C172.028 28.912 172.716 28.752 173.292 28.432C173.868 28.08 174.156 27.6 174.156 26.992C174.156 26.32 173.82 25.792 173.148 25.408C172.476 25.024 171.388 24.592 169.884 24.112C168.22 23.536 166.86 22.992 165.804 22.48C164.78 21.968 163.868 21.216 163.068 20.224C162.3 19.2 161.916 17.904 161.916 16.336C161.916 14.768 162.364 13.424 163.26 12.304C164.156 11.152 165.34 10.272 166.812 9.664C168.316 9.056 169.932 8.752 171.66 8.752C173.516 8.752 175.116 9.104 176.46 9.808C177.836 10.48 178.876 11.392 179.58 12.544C180.284 13.664 180.636 14.864 180.636 16.144C180.636 17.008 180.396 17.664 179.916 18.112C179.436 18.56 178.636 18.784 177.516 18.784C176.524 18.784 175.836 18.624 175.452 18.304C175.1 17.984 174.876 17.536 174.78 16.96C174.684 16.16 174.428 15.52 174.012 15.04C173.628 14.56 172.844 14.32 171.66 14.32C170.764 14.32 170.06 14.48 169.548 14.8C169.068 15.12 168.828 15.568 168.828 16.144C168.828 16.848 169.164 17.392 169.836 17.776C170.54 18.16 171.66 18.576 173.196 19.024C174.828 19.536 176.172 20.048 177.228 20.56C178.284 21.04 179.196 21.776 179.964 22.768C180.732 23.728 181.116 25.008 181.116 26.608C181.116 28.432 180.604 29.936 179.58 31.12C178.556 32.304 177.276 33.152 175.74 33.664C174.204 34.176 172.668 34.432 171.132 34.432Z"
          fill="#FFC672"
        />
      </svg>
    </Link>
  );
}
