# Phần 9. Định tuyến.
=================================================
1.Giao thức định tuyến OSPF là gì?
  - OSPF – Open Shortest Path First là một giao thức định tuyến link – state điển hình.
  - Đây là một giao thức được sử dụng rộng rãi trong các mạng doanh nghiệp có kích thước lớn.
2.Một số đặc điểm chính của giao thức OSPF?
  - OSPF là một giao thức link – state điển hình. Mỗi router khi chạy giao thức sẽ gửi các trạng thái đường link của nó cho tất cả các router trong vùng (area). Sau một thời gian trao đổi, các router sẽ đồng nhất được bảng cơ sở dữ liệu trạng thái đường link (Link State Database – LSDB) với nhau, mỗi router đều có được “bản đồ mạng” của cả vùng. Từ đó mỗi router sẽ chạy giải thuật Dijkstra tính toán ra một cây đường đi ngắn nhất (Shortest Path Tree) và dựa vào cây này để xây dựng nên bảng định tuyến.

  -Số cost được tính theo bandwidth trên cổng chạy OSPF.
  -OSPF chạy trực tiếp trên nền IP, có protocol – id là 89.
  -OSPF là một giao thức chuẩn quốc tế, được định nghĩa trong RFC – 2328.
3.Các bước hoạt động của OSPF
  -Bầu chọn Router-id.
  -Thiết lập mối quan hệ láng giềng.
  -Trao đổi LSDB.
  -Tính toán xây dựng bảng định tuyến.
