# Phần 1.Các khái niệm cơ bản trong mạng máy tính
=================================================
1.Topology là gì?
    - Là cấu trúc hình học không gian mà thực chất là cách bố trí phần tử của mạng cũng như cách nối giữa chúng với nhau.
  1.1.Các loại cấu trúc mạng?
  		-Mạng dạng hình sao(star topology ).
  		-Mạng dạng vòng(ring topology).
  		-Mạng dạng tuyến(linear bus topology).
  		-Mạng dạng hỗn hợp
  1.2.Ưu điểm và nhược điểm của từng loại.
  		- Mạng dạng hình sao(star topology)
        + Ưu điểm:
          * Hoạt động theo nguyên lý song song nếu có một thiết bị nào đó nằm trong nút mạng gặp sự cố thì mạng vẫn hoạt động bình thường.
          * Cấu trúc mạng đơn giản và thuật toán điều khiển ổn định.
          * Mạng có thể tùy thời mở rộng tùy theo yêu cầu của người sử dụng.
        + Nhược điểm:
          * Khả năng mở rộng hoàn toàn phụ thuộc vào trung tâm. Nếu trung tâm gặp sự cố thì toàn mạng ngừng hoạt động.
          * Khoảng cách từ nút các trung tâm hạn chế ( tầm 100m).
          Thiết bị: HUB

      - Mạng dạng vòng ( ring topology)
        + Ưu điểm:
          * Khả năng mở rộng cao.
          * Số lượng đường dây ít.
        + Nhược điểm:
          * Do khép kín nên khi nút nào gặp sự cố thì toàn hệ thống ngừng hoạt động.

      - Mạng dạng tuyến (bus topology)
        + Ưu điểm:
          * Dể lắp đặt, dùng dây cáp ít.
        + Nhược điểm:
          * Khi truyền dữ liệu lớn dễ gây tắc nghẽn.
          * Khó phát hiện nơi bị hỏng.
          * Nếu ngừng đường dây sửa chữa thì phải ngừng toàn bộ hệ thống.

      - Mạng dạng hỗn hợp là sự kết hợp của 2 dạng mạng: star/Bus.

2.Protocol là gì?
    - Là cách thức mà dữ liệu được truyển đi trên mạng.

3.LAN/WAN/MAN/SAN là gì?
    - LAN - Local area network: dùng cho 1 đơn vị, tổ chức.Nhanh, ít lỗi và rẻ tiền.
    - WAN - Wide are network:là sự kết hợp của nhiều LAN,MAN. Chậm , nhiều lỗi hơn so với LAN và WAN.
    - MAN - Metropolean area network : là sự kết hợp của nhiều mạng LAN, chậm, nhiều lỗi và chi phi cao.
    - SAN - Storage-area Networks : là loại mạng có hiệu năng cao. Dùng để di chuyển dữ liệu giữa các máy chủ. Nó là 1 mạng riêng biệt nên tránh được sự xung đột giữa client và server.
4.Mô hình client/server là gì?
    - Mô hình client-server là một mô hình nổi tiếng trong mạng máy tính, được áp dụng rất rộng rãi và là mô hình của mọi trang web hiện có. Ý tưởng của mô hình này là máy con (đóng vài trò là máy khách) gửi một yêu cầu (request) để máy chủ (đóng vai trò người cung ứng dịch vụ), máy chủ sẽ xử lý và trả kết quả về cho máy khách.

5.Mô hình peer-to-peer là gì?
    -Mạng ngang hàng trong đó hoạt động của mạng chủ yếu dựa vào khả năng tính toán và băng thông của các máy tham gia
    chứ không phải tập trung vào một số nhỏ các máy chủ trung tâm như các mạng thông thường.
6.Bandwidth là gì?
    -Là lượng thông tin có thể truyền đi trên một kết nối mạng trong một khoảng thời gian.
    -Lý tưởng.
    -Đơn vị tính:bit/s(bps),Mbps,Gbps,...
7.VPN là gì?
    -Là mạng riêng ảo(virtual private network) là một mạng dành riêng để kết nối các máy tính của các công ty
    tập đoàn hay các tổ chức với nhau thông qua mạng internet công cộng.
8.Intranet là gì?
   -Là mạng nội bộ.
   -Có cấu trúc thượng tầng.
9.Extranet là gì?
   -Bao gồm intranet.
   -Cho phép bên ngoài truy cập thông qua chứng thực.
10.Kiểu truyền:
  10.1 Unicast( 1 node - 1 node)
  10.2 Broadcast(1 node - n node)
  10.3 Multicast( 1node - group node)
  10.4 Anycast(1 node - random node)
11. Throught ( thông lượng).
 - là lượng băng thông thực tế.
12. Các phương tiện truyền dẫn: Không dây và có dây.