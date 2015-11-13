# Phần 12.Dịch vụ gửi nhận mail.
=================================================
1.SMTP là gì?
  -Là chữ viết tắt của Simple Mail Transfer Protoco.
  -Là một giao thức truyền tải thư tín đơn giản.
  -Sử dụng trên máy chủ.
2.SMTP Server là gì?
  -Là máy chủ sử dụng phương thức SMTP để hỗ trợ gửi mail.
3.POP3 là gì?
  -Là chữ viết tắt của Post Office Protocol phiên bản 3.
  -Là một giao thức tầng ứng dụng,dùng để lấy thư điện tử từ server mail thông qua kết nối TCP/IP.
4.IMAP4 là gì?
  -Là chữ viết tắt của Internet Message Access Protocol.
  -Là thế hệ mới của giao thức POP.
  -Kiểm soát email trên mail server.
  -Cung cấp truy cập email ở 3 chế độ khác nhau:
    +offline(ngoại tuyến) giống như POP
    +online(trực tuyến)
    +disconnected(ngắt kết nối)
5.Chuẩn MIME dùng để làm gì?
  -MIME(Multipurpose Internet Mail Extensions) là một chuẩn internet về định dạng cho thư điện tử.
6.Các thành phần trong hệ thống mail server.
	a.Mail box
	b.User Agent
		-Mail User Agent (MUA): đây là các chương trình gửi và nhận mail được cài đặt trên máy người dùng,
		 nó giúp người dùng quản lý, soạn thảo, nhận và gửi mail một cách tiện lợi và nhanh chóng.
		 Các chương trình MUA tiêu biểu là: Outlook (Windows), Evolution (Linux), ThunderBird va Eudora.
	c.Message queue
		-Là một mô hình giao tiếp truyền tin bất đồng bộ.Có nghĩa là việc trao đổi giữa người gửi và
		người nhận không cần xảy ra đồng thời,tại cùng một thời điểm.Người gửi có thể đẩy tin cần gửi vào
		các hàng đợi và sau đó một số tiền trình độc lập sẽ đẩy tin từ hàng đợi đến người nhận.
	d.Message transfer agent(MTA)
		-Là một dịch vụ trên máy tính có nhiệm vụ chuyển Email từ máy tính đến một nơi khác (Mail Delivery Agent).
		-Các chương trình cung cấp dịch vụ MTA tiêu biểu là: Qmail, Sendmail, Postfix (Linux), Edge/Hub Tranpost của MS Exchange Server (Windows).
