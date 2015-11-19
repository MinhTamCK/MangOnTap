# Phần 10.TCP và UDP
=================================================
*Một gói dữ liệu TCP gồm 2 phần: header và data

1.Cấu trúc TCP Segment header?
  *Gồm 11 trường trong đó có 10 trường là bắt buộc,trường thứ 11 là tùy chọn.
  -Source port: Số hiệu của cổng tại máy tính gửi.
  -Destination port :Số hiệu của cổng tại máy tính nhận.
  -Sequence number: Trường này có 2 nhiệm vụ.Nếu cờ SYN bật thì nó là số thứ tự gói ban đầu và byte đầu tiên được gửi có số thứ tự này cộng thêm 1.Nếu không có cờ SYN thì đây là số thứ tự của byte đầu tiên.
  -Acknowledgement number:Nếu cờ ACK bật thì giá trị của trường chính là số thứ tự gói tin tiếp theo mà bên nhận cần.
  -Data offset:Trường có độ dài 4 bit quy định độ dài của phần header.Phần header có độ dài tối thiểu là 5(160 bit) từ và tối đa là 15(480bit) từ.
  -Reserved: Dành cho tương lai và có giá trị là 0;
  -Flags(Control bits):Bao gồm 6 cờ:
    +URG:Cờ cho trường Urgent pointer.
    +ACK:Cờ chi trường Acknowledgament.
    +PSH:Hàm Push.
    +RST:Thiết lập lại đường truyền.
    +SYN:Đồng bộ lại số thứ tự.
    +FIN:Không gửi thêm số liệu.
  -Window:Số byte có thể nhận bắt đầu từ giá trị của trường báo nhận(ACK).
  -Checksum:16 bit kiểm tra cả phần header và dữ liệu.
  -Urgent Pointer:Nếu cờ URG bật thì giá trị trường này chính là số từ 16 bit mà số thứ tự gói tin (sequence number) cần dịch trái.
  -Options:Đây là trường tùy chọn.Nếu có đây là bội số của 32 bit.
  -Data:Không thuộc về header.Giá trị này là thông tin dành cho các tầng trên(trong mô hình 7 lớp OSI).
