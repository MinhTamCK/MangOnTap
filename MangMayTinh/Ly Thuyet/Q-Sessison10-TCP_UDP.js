# Phần 10.TCP và UDP
=================================================
1. TCP - Transport Control Protocol
 - là giao thức kiểu dòng, nghĩa là dữ liệu được coi như dãy các byte có thứ tự nhưng không có cấu trúc.
 - Chống tắc nghẽn , điều chỉnh lượng dữ liệu truyền đi cho phù hợp.
 - TCP cung cấp kết nối full-duplex: nghĩa là đồng thời vừa nhận và vừa gửi trên cùng 1 lúc.
 - TCP hướng kết nối.
 - TCP kiểm soát luồng , kiểm soát tắc nghẽn , pipeline.
 1.1: Cấu trúc gói tin:
 	- Source port: nơi gởi
 	- Des port: nơi nhận
 	- Sequence number: số thứ tự byte đầu tiên trong dữ liệu của gói. 
 	- ACK number: số tứ tự byte đang mong chờ nhận tiếp theo.
 	- Window size: Thông báo nhận số lượng byte sau byte cuối cùng nhận được.
 	- CheckSum: Kiểm lỗi.
 	- Urgent pointer: Dữ liệu khẩn trong trường dữ liệu.
 	- Cờ:
 		* URG:
 		* ACK:
 		* PSH: dữ liệu phân phối ngay
 		* RST: kết nối thiết lập lại
 		* SYN: sử dụng lập kết nối
 		* FIN: đóng kết nối.
 1.2: Ứng dụng TCP:
 		- WWW, thư điện tử và Secure Shell.
