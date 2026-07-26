# AuRen Ecosystem Root Repo

Repo này đóng vai trò **repo tổng** để liên kết, theo dõi và điều phối phát triển cho các dự án Riks, AuRen, SandboxCode và SandboxCodeX.

## Mục tiêu

- Gom các repo con vào một cấu hình chung tại `ecosystem.projects.json`.
- Cho phép xem nhanh toàn bộ dự án, nhóm đồng bộ và vai trò của từng repo.
- Tạo lệnh clone/sync/check thống nhất để khi phát triển repo tổng, các repo con biết cần cập nhật tương ứng.
- Tránh biến repo tổng thành nơi copy code trùng lặp; repo tổng giữ metadata, kế hoạch điều phối và quy trình phát hành.

## Repo con đang được điều phối

| Nhóm | Repo | Vai trò |
| --- | --- | --- |
| `web-hub` | `clauderiks/riks-pages` | Hub public, docs, discussions và mockups. |
| `core-platform` | `clauderiks/auren-os` | Nền tảng AuRen OS/workspace. |
| `sandbox-runtime` | `clauderiks/SandboxCode` | Sandbox runtime và thử nghiệm chạy code an toàn. |
| `core-platform` | `clauderiks/riks` | Identity, ý tưởng nền và thành phần dùng chung. |
| `ide` | `clauderiks/SandboxCodeX-IDE` | IDE surface cho SandboxCodeX. |
| `ide` | `Huynhthuong2505/SandboxCodeX-v1` | Prototype/archive của SandboxCodeX v1. |
| `agent` | `Huynhthuong2505/SandboxCodex` | Track agent/code assistant bổ sung cho SandboxCodeX. |

## Lệnh điều phối

```bash
pnpm ecosystem list
pnpm ecosystem clone-plan
pnpm ecosystem sync-plan
pnpm ecosystem check-plan
```

Có thể lọc theo `project-id`, `owner` hoặc `syncGroup`:

```bash
pnpm ecosystem list ide
pnpm ecosystem sync-plan sandboxcode
pnpm ecosystem check-plan clauderiks
```

## Quy tắc đồng bộ phát triển

1. Mỗi thay đổi lớn trong repo tổng phải ghi rõ repo con bị ảnh hưởng.
2. Nếu thay đổi schema, UI flow, agent flow hoặc runtime contract thì tạo issue/PR tương ứng ở repo con cùng `syncGroup`.
3. Trước release, chạy `pnpm ecosystem check-plan` để lấy danh sách lệnh test/build cần chạy trong từng repo con.
4. Changelog của repo tổng phải có mục riêng cho từng repo con bị ảnh hưởng.

## Khi tạo repo GitHub mới

Nếu cần tách thành repo mới thật sự trên GitHub, dùng repo này làm seed:

```bash
git clone <repo-hien-tai> auren-ecosystem-root
cd auren-ecosystem-root
git remote set-url origin https://github.com/<owner>/auren-ecosystem-root.git
git push -u origin main
```

Sau đó bật branch protection và yêu cầu các check trong `ecosystem.projects.json > syncPolicy.requiredChecks`.
