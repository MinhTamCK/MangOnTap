# Phần 10.TCP và UDP, Mở rộng 
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
 1.3: TCP - Thiết lập kết nối: thực hiện thao tác bắt tay 3 lần:

 		Máy A    ---------SYN(seq=x)-------> Máy B	
 				 <-----SYN,ACK(seq=y,ACK = x + byte)----
 				 ------------ACK(seq=x+byte, ACK = y + byte)---> 

 		Ví dụ:(quan trọng có thể thi)
 			SYN (seq = 10, byte = 8)
 			SYN, ACK (seq = 18, byte = 2, ACK = 18)
 			ACK(seq=20, ACK = 20)
 			Xem kĩ về khái niệm Sequence number và ACK number.
 1.4: TCP - Đóng kết nối: bắt tay 2 lần
 		client -----------------FIN--------> Server
 			   <----------------ACK---------
 			   <----------------FIN---------
 			   ----------------ACK---------> 
2. Nghi thức truyền dữ liệu tin cậy:
	2.1: RDT 1.0: xem thêm trong slide
	2.2: RDT 2.0,2.1,2.2
	2.3: RDT 3.0(quan trọng có thể thi)
	2.4. Giải quyết lỗi bit:
		Bên gởi:
			- gởi kèm thông tin kiểm tra lỗi.
			- sử dụng: checksum,parity check,..
		Bên nhận:
			- kiểm tra lỗi bit.
			- khi xảy ra lỗi bit, báo về bên gởi.
	2.5. Giải quyết mất gói:
		Bên nhận:
			- gởi tín hiệu báo: ACK or NAK.
		Bên gởi:
			- định nghĩa trường hợp mất gói.
			- Chờ nhận tính hiệu báo.
			- hành động khi mất gói.
3. Pipeline(quan trọng có thể thi)
	3.1: Go-back-N.
	3.2: Gởi có chọn.
	3.4: Nguyên lý: Cho phép gửi nhiều gói tin khi chưa nhận ACK.
		- sử dụng buffer để lưu gói tin.
		Bên gởi: lưu gói tin đã gởi nhưng chưa ACK.
		Bên nhận: lưu gói tín đúng nhưng chưa đúng thứ tự
	3.5: Giải quyết mất gói: Go-back-N or Selective repeat
4: UDP - User Datagram Protocol:
		- Dịch vụ “nỗ lực” để truyền nhanh
		- Gói tin UDP có thể:
			+ Mất
			+ Không đúng thứ tự
		- Không kết nối:
			+ Không có handshaking giữa bên gửi và nhận
			+ Mỗi gói tin UDP được xử lý độc lập
		- Không có trạng thái kết nối
	4.1: Cấu trúc gói tin:
		- Source port : nơi gởi
		- des port: nơi nhận.
		- lenght: chiều dài gói tin.
		- checksum: thông tin kiểm tra lỗi.
	4.2: Tại sao lại sử dụng UDP?
			- Không thiết lập kết nối
			- Đơn giản:
				+ không quản lý trạng thái nối kết
				+ Không kiểm soát luồng
			- Header nhỏ
			- Nhanh
	4.3: Truyền thông tin cậy qua UDP
			- Tầng application phát hiện và phục hồi lỗi
	4.4: Thường sử dụng cho các ứng dụng multimedia
			- Chịu lỗi
			- Yêu cầu tốc độ
	4.5: Một số ứng dụng sử dụng UDP
			+ DNS
			+ SNMP
			+ TFTP
			  …


