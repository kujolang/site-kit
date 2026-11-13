# Second documentation consumer fixture

Derived from the separately built `sitekit-docs-template` reference/site-configuration page at revision `70b8617067387761a411b27d0b7f1a8b3f25aded` (MIT). Its full `bash scripts/test-template.sh` passed before extraction. Original rendered HTML SHA-256: `0ce1bc790f9e3a5b4cab51c88e5461e27ce92acc6d249fa83d239b1fec103f52`.

The fixture keeps the actual sidebar, reference prose, settings table, shell example, outline and previous/next navigation. The shared recipe replaces the layout classes and styles. The adaptation adds table caption/header scope/contained scrolling and explicit heading IDs (normally provided by the template's script), omits template-specific metadata badges and uses local distribution paths. It does not claim the entire starter was migrated. Route targets remain owned by the original application. The test exercises outline anchors and layout rather than following routes outside this isolated fixture.
